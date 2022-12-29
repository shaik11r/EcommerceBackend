/**
 * this contain the routing logic for the category controller
 */
const {requestValidator,authJwt}=require('../middlewares')

const categoryController=require("../controllers/categoryControllers")

module.exports=function(app){
    app.post("/ecom/api/v1/categories",[requestValidator.validateCategoryRequest,authJwt.verifyToken,authJwt.isadmin],categoryController.create);
    //route for the post request to create a category
    app.get("/ecom/api/v1/categories",categoryController.findAll);
    //route for the get request to fetch all the category
    app.get("/ecom/api/v1/categories/:id",categoryController.findOne);
    //route for the get request to fetch based on the category id
    app.put("/ecom/api/v1/categories/:id",[requestValidator.validateCategoryRequest,authJwt.verifyToken,authJwt.isadmin],categoryController.update);
    //route for the put request to update a category based on id
    //route for the delete request to delete a category based on id;
    app.delete("/ecom/api/v1/categories/:id",categoryController.delete);
    //normally we have created a methods for every thing in controller 
}