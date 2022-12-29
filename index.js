const express=require('express');
const Sequelize=require('sequelize');
const bodyparser=require('body-parser');
const db=require('./models')
const app=express();

/**
 * using the body parser middleware
 * 
 * used for parsing the request 
 * parsing the request of the json and convert that to object
 */

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
const Category=db.category;//we are going to drop the already existing tables and creating a dummy one ;
const Product=db.product;
const Role=db.role;
Category.hasMany(Product);//it will create a foregin key in the product table ie categoryid;
db.sequelize.sync({force:true}).then(()=>{
    console.log('tables dropped and created');
    init();
})
function init(){
    var categories=[{
        name:"Electronics",
        description:"this is an electronic category contains its products"
    },
{
    name:"kitchenitems",
    description:"this is where kitchen items are stored and im using y just for pratice"
}]


Category.bulkCreate(categories).then(()=>{
    console.log("category table initilaised");
}).catch(err=>{
    console.log("Error while initialising categories table");
})
}
// Role.create({
//     id:1,
//     name:"user"
// })
// Role.create({
//     id:2,
//     name:"admin"
// })
require('./routes/categoryRoutes')(app);
require('./routes/productRoute')(app);
require('./routes/authRoutes')(app)

app.listen(3000,()=>{
    console.log("stared to listen");
})