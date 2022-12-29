
const { Sequelize } = require('../models');
const db=require('../models');
const Product=db.product;
const op=Sequelize.Op;

//schema that we created or table
//create function

exports.create=(req,res)=>{
    console.log(req.body);

if(!req.body.cost){
    res.status(400).send({
        message:"cost is required"
    });
    return;
}
const newProduct={
    name:req.body.name,
    description:req.body.description,
    cost:req.body.cost,
    categoryId:req.body.categoryId
};
//table name create 

    Product.create(newProduct).then(prod=>{
        console.log(`product name:${newProduct.name} got created`)
        res.status(201).send(prod);
        })
        .catch(err=>{
            res.status(500).send({
                message:`some error while creating a new entry ${err}`
            })
        }) 
}
exports.findAll=(req,res)=>{
    let productName=req.query.name;
    let promise;
    let minCost=req.query.minCost;
    let maxCost=req.query.maxCost;
    //if productName is null then we will return all products;
    if(productName){
        promise=Product.findAll({
            where:{
                name:productName
            }
        })
    }
    else if(minCost&&maxCost){
        promise=Product.findAll({
            where:{
                cost:{
                    [op.gte]:minCost,
                    [op.lte]:maxCost
                }
            }
        })
    }
    else if(minCost){
        promise=Product.findAll({
            where:{
                cost:{
                    [op.gte]:minCost
                }
            }
        })
    }
    else if(maxCost){
        promise=Product.findAll({
            where:{
                cost:{
                    [op.lte]:maxCost
                }
            }
        })
    }
    else{
        promise=Product.findAll();
    }

//if name is there in query then search according to it or else findall
    promise.then(prod=>{
        res.status(200).send(prod);
    })
    .catch(err=>{
        res.status(500).send({
            message:`some internal error while fetching all products`
        })
    })
}

exports.findOne=(req,res)=>{
    const productId=req.params.id;
    Product.findByPk(productId)
    .then(prod=>{
        res.status(200).send(prod);
    }).catch(err=>{
        res.status(404).send({
            message:`there id nothing with the id ${productId}`
        })
    })
}
exports.update=(req,res)=>{
    const product={
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost,
    }
    const productId=req.params.id;
    Product.update(product,{
        where:{
            id:productId
        }
    })
    .then(updatedProduct=>{
        Product.findByPk(productId)
        .then(prod=>{res.status(200).send(product)})
    }).catch(err=>{
        res.status(500).send({
            message:"some internal error while updating"
        })
    })
}
exports.delete=(req,res)=>{
    const productId=req.params.id;
    Product.destroy({
        where:{
            id:productId
        }
    })
    .then(result=>{
        res.status(200).send({
            message:"successfully deleted the product"
        })
    }).catch(err=>{
        res.status(500).send({
            message:"some internal problem while deleting"
        })
    })
}
exports.getProductsUnderCategory=(req,res)=>{
    const categoryId=parseInt(req.params.categoryId);
    Product.findAll({
        where:{
            categoryId:categoryId
        }
    })
    .then(products=>{
        res.status(200).send(products);
    }).catch(err=>{
        res.status(500).send({
            message:"some internal error while fetching products based on categoryId18601801290"
        })
    })
}