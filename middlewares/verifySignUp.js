const db =require('../models');
const ROLES=db.ROLES;
const User=db.user;
checkDuplicateUsernameOrEmail=(req,res,next)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(result=>{
       if(result){
        res.status(400).send({
            message:"falied username is already used"
        
        })
        return;
       }
    })
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{
        if(user){
            res.status(400).send({
                message:"failed email is already in user"
            })
            return
        }
        next();
    })
    
}
checkRolesExisted=(req,res,next)=>{

    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message:"failed roles doesnt exists"+req.body.roles[i]
                });
                return
            }
        }
    }
    next();
}
const verifySignUp={
checkDuplicateUsernameOrEmail:checkDuplicateUsernameOrEmail,
checkRolesExisted:checkRolesExisted
}
module.exports=verifySignUp;
