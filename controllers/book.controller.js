const axios = require('axios');

const Wishlist = require('../models/wishlist')

async function getIndex(req, res, next) {
    try {
        res.render('index', {
            pageTitle: 'search book',
            path: '/'
        })
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

async function searchBook(req, res, next) {
    try {
        const { title } = req.body
        const response = await axios.get(`
        https://www.googleapis.com/books/v1/volumes?q=${title}
        `)

        const finalResponse = response.data.items.map(obj => {
            
            let newObj = {
                ...obj,
                volumeInfo: {
                    ...obj.volumeInfo,
                    averageRating: Math.ceil(obj.volumeInfo.averageRating)
                } 
            }

            return newObj
        })

        res.render('result', {
            pageTitle: 'result of search',
            results: finalResponse,
            path: '/result',
            search: title
        })
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

async function getBook(req, res, next) {
    try {
        const response = await axios.get(`
        https://www.googleapis.com/books/v1/volumes/${req.params.bookId}
        `)
        res.render('book', {
            pageTitle: 'detail book',
            result: response.data,
            path: '/getbook'
        })
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

async function detailWishlist(req, res, next) {
    try {
        const response = await axios.get(`
        https://www.googleapis.com/books/v1/volumes/${req.params.bookId}
        `)
        res.render('book', {
            pageTitle: 'detail wishlist',
            result: response.data,
            path: '/detail-wishlist'
        })
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

async function postWishlist(req, res, next) {
    try {
        const wishlistId = req.params.wishlistId;
        const existedData = await Wishlist.find({ 'bookId': wishlistId })
        if (existedData.length == 0) {
            const wishlist = new Wishlist({
                bookId: wishlistId
            });
            await wishlist.save()
        }
        res.redirect('/my-wishlists');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

async function getWishlists(req, res, next) {
    try {
        const wishlistsMongo = await Wishlist.find()
        let wishlists = []
        
        for (let i=0; i < wishlistsMongo.length; i++) {
            let response = await axios.get(`
            https://www.googleapis.com/books/v1/volumes/${wishlistsMongo[i].bookId}`)
            wishlists.push(response.data)
        }

        res.render('result', {
            pageTitle: 'my wishlists',
            results: wishlists,
            path: '/wishlists'
        })
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

async function deleteWishlist(req, res, next) {
    try {
        const bookId = req.params.bookId;
        
        await Wishlist.deleteOne({bookId: bookId})
        console.log('DESTROYED PRODUCT');
        res.status(200).json({ message: 'Success!' });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

module.exports = {
    getIndex,
    searchBook,
    getBook,
    postWishlist,
    getWishlists,
    deleteWishlist,
    detailWishlist
}