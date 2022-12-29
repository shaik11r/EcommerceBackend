const db =require('../models');
const config=require("../config/authConfig");
const User=db.user;
const Role=db.role;

const Op=db.Sequelize.Op;

var jwt=require("jsonwebtoken");
var bcrypt=require("bcrypt");

exports.signup=(req,res)=>{
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,13)
    }).then(user=>{
        console.log("user created");
        if(req.body.roles){
            Role.findAll({
                where:{
                    name:{
                        [Op.or]:req.body.roles
                    }
                }
            }).them(roles=>{
                user.setRoles(roles)
                .then(()=>{
                    res.send({message:"user registred sucessfully"})
                })
            })
        }
        else{
            user.setRoles([1]).then(()=>{
                res.send({message:"user registered sucessfully"})
            })
        }

    })
    .catch(err=>{
        res.status(500).send({message:`${err.message}`})
    })
}
exports.signin=(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(user=>{
        if(!user){
            return res.status(404).send({message:'user not found'});
        }
        var passwordIsValid=bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid){
            return res.status(401).send({
                message:`invalid password`
            })
        }
        var token=jwt.sign({id:user.id},config.secret,{
            expiresIn:86400//24hrs
        });
        res.status(200).send({
            id:user.id,
            username:user.username,
            email:user.email,
            acessToken:token
        })
    })
    .catch(err=>{
        res.status(500).send({message:`${err.message}`})
    })
}
