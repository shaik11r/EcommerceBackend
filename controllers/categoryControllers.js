
const db=require("../models");
const Category=db.category;

exports.create=(req,res)=>{
    /**
     * validation of request body
     * we will get a post request and he has to send name: and description
     * if no name we will send a message 
     * name of the category cant be empty;
     */
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the category cant be empty!"
        })
        return;
    }
    const newcategory={
        name:req.body.name,
        description:req.body.description
    };
    Category.create(newcategory).then(category=>{
        console.log(`category name:[${newcategory.name}] got inserted`)
        res.status(201).send(category);
    }).catch(err=>{
        console.log(`issue in inserting category name:${newcategory.name}`)
        console.log(`Error message:${err.message}`)
        res.status(500).send({
            message:"some internal error while storing the category"
        })
    })
}

//finding means we would get like ?name=kitchen
exports.findAll=(req,res)=>{
    let categoryName=req.query.name;//using name to find it 
    let promise;
    if(categoryName){
        promise=Category.findAll({
            where:{
                name:categoryName
            }
        })
    }
    
    else{
        promise=Category.findAll();
    }
    promise.then(categories=>{
        res.status(200).send(categories);
    })
    .catch(err=>{
        res.status(500).send({
            message:"some internal error while fetching the categories"
        })
    })
}
exports.findOne=(req,res)=>{
    const categoryId=req.params.id;
    Category.findByPk(categoryId)//returns a promise 
    .then(category=>{
        if(category==NULL){
            res.send(404);
        }
        res.status(200).send(category);
    })
    .catch(err=>{
        res.status(404).send({
            message:`there is nothing with the id: ${categoryId}`
        })
    })
}
exports.update=(req,res)=>{
    const category={
        name:req.body.name,
        description:req.body.description
    };//updating both name and description
    const categoryId=req.params.id
    Category.update(category)//using for update both categroy returns a promise 



.then(updatedCategory=>{
    /**
     * where the updation happened sucessfully.
     * you need to send the updated row to the table
     * but while fetching that row and sending it to user
     * there can be a error
     */
    Category.findByPk(categoryId)//findByPk is an method only returns single entry 
    //using the primary key only 
    .then(category=>{
        res.status(200).send(category);
    })
    .catch(
        res.status(500).send({
            message:"some internal error while fetching failed"
        })
    )
})
.catch(err=>{
    res.status(500).send(
    {
        message:"error "
    }
    )
}
)}


exports.delete=(req,res)=>{
    const categoryId=req.params.id;//id we would take and use destroy to delete it then using .then we will see
    Category.destroy({
        where:{
            id:categoryId
        }
    }).then(result=>{
        res.status(200).send({
            message:"successfully deleted the category"
        })
    }).catch(err=>{
        res.status(500).send({
            message:"some internal error while deleting the category based on id"
        })
    })
}