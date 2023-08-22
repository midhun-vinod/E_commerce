const wishlists = require('../models/wishlistSchema')

exports.addToWishlist = async (req,res)=>{

    const {id,title,price,image} = req.body
    console.log('addToWishlist');

    try{
        console.log("trying");
        const item = await wishlists.findOne({id})
        if(item){
            console.log('if');
            res.status(402).json("Product already exist in wishlist")
        }else{
            console.log('else');
            const newProduct = new wishlists({
                id,
                title,
                price,
                image
            })
            await newProduct.save()
            res.status(200).json("Item added to wishlist")
        }
    }
    catch(error){
        console.log('catch');
        res.status(401).json(error)
    }
}

exports.getWishlist = async (req,res)=>{
    try{
        allProducts = await wishlists.find()
        res.status(200).json(allProducts)
    }
    catch{(error)
        res.status(401).json(error)
    }
}

exports.removeFromWishlist = async (req,res)=>{

    const {id} = req.params

    try{
        const removeItem = await wishlists.deleteOne({id})
        if(removeItem){
            const allProducts = await wishlists.find()
            res.status(200).json(allProducts)
        }
        else{
            res.status(404).json("Item not present in wishlist!!!!")
        }
    }
    catch(error){
        req.status(401).json(error)
    }
}