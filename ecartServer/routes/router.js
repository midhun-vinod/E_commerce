const express = require('express')

const productController = require('../controllers/productController')

const wishlistController = require('../controllers/wishlistController')

const cartController = require('../controllers/cartController')

const router = new express.Router()

router.get('/products/all-products',productController.getAllProducts)

router.get('/products/view-product/:id',productController.viewProduct)

router.post('/products/add-to-wishlist',wishlistController.addToWishlist)

router.get('/products/get-wishlist',wishlistController.getWishlist)

router.delete('/wishlist/remove-from-wishlist/:id',wishlistController.removeFromWishlist)

router.post('/add-to-cart',cartController.addToCart)

router.get('/get-cart',cartController.getCart)

router.delete('/remove-from-cart/:id',cartController.removeFromCart)

router.delete('/empty-cart',cartController.emptyCart)

router.get('/increment-item/:id',cartController.incrementItem)

router.get('/decrement-item/:id',cartController.decrementItem)

module.exports = router