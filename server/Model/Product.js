const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    title: { type: String },
    category: { type: String },
    sub_category: { type: String },
    price: { type: Number },
    tags: [{ type: String }],
    username: { type: String }
})

module.exports = mongoose.model('Product', Product)