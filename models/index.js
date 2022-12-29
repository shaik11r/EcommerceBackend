const config=require('../config/dbConfig');
const { Sequelize } = require('sequelize');


/**
 * creating a database connection
 */
const seq=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:config.HOST,
        dialect:config.dailect
    }
)

/**
 * here db creating a object of sequelize and seq which has connection details and category model db.category
 */
const db={};
db.Sequelize=Sequelize;
db.sequelize=seq;
db.category=require('./categoryModel')(seq,Sequelize)
db.product=require('./productModel')(seq,Sequelize);
db.user=require('./userModel')(seq,Sequelize);
db.role=require('./roleModel')(seq,Sequelize);
db.cart=require('./cartModel')(seq,Sequelize);
/**
 * establishing the relationship between role and the user
 */

db.role.belongsToMany(db.user,{
    through:"user_roles",
    foreignkey:"roleId",
})
db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignkey:"userId",
})
db.product.belongsToMany(db.cart,{
    through:"cart_products",
    foreignkey:"productId"
})
db.cart.belongsToMany(db.product,{
    through:"cart_products",
    foreignkey:"cartId"
})
db.user.hasMany(db.cart);
db.ROLES=["user","admin"];

module.exports=db;

/**
 * db={
 * Sequelize:
 * sequelize:
 * category:function(sequelize ,Sequelize)
 * {
 * }
 * product:function(sequelize,Sequelize){
 * }
 * }
 */