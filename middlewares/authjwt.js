const jwt=require('jsonwebtoken')
const config=require('../config/authConfig')
const db=require("../models");
const User=db.user;
verifyToken=(req,res,next)=>{
let token=req.headers["x-access-token"];//we get token passed by the user
if(!token){//if no token is passed then err
    return res.status(403).send({
        message:"no token provided"
    });
}
jwt.verify(token,config.secret,(err,decoded)=>{  //after decoded we ge id if no error req.userId
    if(err){
        return res.status(401).send({
            message:"Unathorised"
        })
    }
    req.userId=decoded.id;
    next();
})
}
isadmin=(req,res,next)=>{
    User.findByPk(req.userId)
    .then(user=>{
        user.getRoles()
        .then(roles=>{
            for(let i=0;i<roles.length;i++){
                if(roles[i].name="admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message:"Required admin role"
            });
            return;
        })
    })
}
const authJwt={
    verifyToken:verifyToken,
    isadmin:isadmin
}
module.exports=authJwt;