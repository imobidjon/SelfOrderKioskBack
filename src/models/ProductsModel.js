const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.String, ref: 'Categories'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        max: 30
    },
    price: {
        type: Number,
        required: true
    },
    image: {type: String},

}, {timestamps: true})

module.exports = mongoose.model("Products", productsSchema)