const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    // id:Number,
    name:String,
    image:String,
    countInStock:{
        type:Number,
        required:true
    }
})


const Product = mongoose.model('Product', productSchema);
module.exports = Product;