const products = require('../models/productSchema')

exports.getAllProducts = async (req,res)=>{

    try{
        allProducts = await products.find()
        res.status(200).json(allProducts)
    }
    catch{(error)
        res.status(401).json(error)
    }
}

exports.viewProduct = async (req,res)=>{

    const id = req.params.id
    console.log(id);

    try{
        console.log('trying');
        const product = await products.findOne({id})
        if(product){

            console.log('success');
            console.log(product);
            res.status(200).json(product)
        }
        else{
            console.log('else');
            res.status(404).json("Product Not Found!!!!")
        }
    }
    catch(error){
        console.log('oooombi');
        res.status(401).json(error)
    }
}