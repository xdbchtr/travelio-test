const express = require('express');

const bookController = require('./controllers/book.controller');

const router = express.Router();

router.get('/', bookController.getIndex)

router.post('/search-book', bookController.searchBook)

router.get('/search-book/:bookId', bookController.getBook)

router.get('/detail-wishlist/:bookId', bookController.detailWishlist)

router.post('/add-to-wishlist/:wishlistId', bookController.postWishlist)

router.get('/my-wishlists', bookController.getWishlists)

router.delete('/delete-wishlist/:bookId', bookController.deleteWishlist)

module.exports = router;