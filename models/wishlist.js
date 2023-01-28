const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wishListSchema = new Schema({
    bookId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('wishlist', wishListSchema)