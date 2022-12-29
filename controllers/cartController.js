const db=require('../models');
const Product=db.product;
const Cart=db.cart;
const Op=db.Sequelize.Op;
exports.create=(req,res)=>{
    const cart={
        userId:req.userId
    };
    Cart.create(cart)
    .then(cart=>{
        res.status(201).send(cart);
    })
    .catch(err=>{
        res.status(500).send({
            message:"some internal server error happened"
        })
    })
}
exports.update=(req,res)=>{

    const cartId=req.params.id;
    Cart.findByPk(cartId)
    .then(cart=>{
        Product.findAll({
            where:{
                id:req.body.productIds
            }
        }).then(items=>{
            if(!items){
                res.status(400).send({
                    message:"items trying to add does not exist"
                })
            }
            cart.setProducts(items)
            .then(products=>{
                var cost=0;
                const productSelected=[];
                for(let i=0;i<products.length;i++){
                    cost=cost+products[i].cost;
                    productSelected.push({
                        id:products[i].id,
                        name:products[i].name,
                        cost:products[i].cost
                    });
                }
                res.status(200).send({
                    id:cart.id,
                    productSelected:productSelected,
                    cost:cost
                })
            })
        })
        .catch(err=>{
            res.status(500).send({
                message:"some internal server error happened while fetching product details"
            })
        })
    })
}
exports.getCart=(req,res)=>{
    Cart.findByPk(req.params.cartId).then(cart=>{
        var cost=0;
        const productSelected=[];
        cart.getProducts().then(products=>{
            for(let i=0;i<products.length;i++){
                cost =cost+products[i].cost;
                productSelected.push({
                    id:products[i].id,
                    name:produts[i].name,
                    cost:products[i].cost
                });
            }
            res.status(200).send({
                id:cart.id,
                productSelected:productSelected,
                cost:cost
            })
        })
    })
}