const db=require('../models');
const Category=db.category;
const Product=db.product;
const validateCategoryRequest=(req,res,next)=>{
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the category cant be empty !"
        })
    }
    next();
}
const validateProductRequest=(req,res,next)=>{
    if(!req.body.name){
        res.status(400).send({
            message:"name of the product is required"
        })
    }
    if(!req.body.cost){
        res.status(400).send({
            message:"cost  of the product cant be empty !"
        }); 
        return;
    }
    if(!req.body.categoryId){
        Category.findByPk(req.body.categoryId)
        .then(category=>{
            if(!category){
                res.status(400).send({
                    message:"category id passed is not available"
                })
                return;
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"some internal error occured while fetching "
            })
        })
    }
    else{
        res.status(400).send({
            message:"Category id was not passed"
        })
        return;
    }
    next();

}
module.exports={
    validateCategoryRequest:validateCategoryRequest,
    validateProductRequest:validateProductRequest
}