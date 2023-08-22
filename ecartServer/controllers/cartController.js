const cartitems = require('../models/cartSchema')

exports.addToCart = async (req,res)=>{

    const {id,title,price,image,quantity} = req.body

    try{
        const product = await cartitems.findOne({id})
        if(product){
            product.quantity+=1
            product.grandtotal = product.price*product.quantity
            product.save()
            res.status(200).json("Items added to your cart....")
        }
        else{
            const newProduct = new cartitems({
                id,title,price,image,quantity,grandtotal:price
            })
            await newProduct.save()
            res.status(200).json("Item added to your cart....")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.removeFromCart = async(req,res)=>{
    const {id} = req.params

    try{
        const removeItem = await cartitems.deleteOne({id})
        if(removeItem){
            const allProducts = await cartitems.find()
            res.status(200).json(allProducts)
        }
        else{
            res.status(404).json("Item not present in cart!!!!")
        }
    }
    catch(error){
        req.status(401).json(error)
    }
}

exports.getCart = async (req,res)=>{
    try{
        const allItems = await cartitems.find()
        res.status(200).json(allItems)
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.emptyCart = async(req,res)=>{
    
    try{
        const items = await cartitems.deleteMany({})
        res.status(200).json("Your cart is empty now")
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.incrementItem = async(req,res)=>{

    const {id} = req.params

    try{
        const product = await cartitems.findOne({id})
        if(product){
            product.quantity+=1
            product.grandtotal=product.price*product.quantity
            await product.save()
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else{
            res.status(404).json("Product is not in your item")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.decrementItem = async(req,res)=>{
    const {id} = req.params

    try{
        const product = await cartitems.findOne({id})
        if(product){
            product.quantity-=1
            if(product.quantity==0){
                await cartitems.deleteOne({id})
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }
            else{
                product.grandtotal=product.price*product.quantity
                await product.save()
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}