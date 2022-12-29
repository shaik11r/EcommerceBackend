const productController=require('../controllers/productContoller');
const {requestValidator, authJwt}=require('../middlewares');
module.exports=function(app){
    app.post("/ecom/api/v1/products",[requestValidator.validateProductRequest,authJwt.verifyToken,authJwt.isadmin],productController.create);
    
    app.get("/ecom/api/v1/products",productController.findAll);

    app.get("/ecom/api/v1/products/:id",productController.findOne);
    
    app.put("/ecom/api/v1/products/:id",[requestValidator.validateProductRequest,authJwt.verifyToken,authJwt.isadmin],productController.update);

    app.delete("/ecom/api/v1/products/:id",[authJwt.verifyToken,authJwt.isadmin],productController.delete);
}
