const {authJwt}=require('../middlewares');
const cartController=require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authjwt');

module.exports=function(app){
    app.post("/ecom/api/v1/carts",[authJwt,verifyToken],cartController.create);
    
    app.put("/ecom/api/v1/cart/:id",[authJwt.verifyToken],cartController.update);

    app.get("/ecom/api/v1/carts/cartId",[authJwt.verifyToken],cartController.getCart)
}