
module.exports=(sequelize,Sequelize)=>{
const Category=sequelize.define(
"category",{
id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
},
name:{
    type:Sequelize.STRING,
    allowNull:false,
},
description:{
    type:Sequelize.STRING,
    allowNull:false,
}
}
)
return Category//return category;;;;
}