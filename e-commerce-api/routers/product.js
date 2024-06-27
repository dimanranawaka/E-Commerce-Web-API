const express = require('express');
const {Product} = require("../models/productSchema");
const router = express.Router();
const {Category} = require('../models/categorySchema');
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    const product = await Product.find().populate('category');
    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
});

router.get('/:id', async(req,res)=>{
    const product = await Product.findById({_id:req.params.id});
    if(!product){
        return res.status(400).send('the product cannot be found!');
    }
    res.send(product);
})

router.post(`/`, async (req, res) => {

    /*const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')*/

    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured
    })
    product= await product.save();

    if(!product){
        return res.status(404).send('the product cannot be created');
    }
    res.send(product);
});

router.put('/:id',async(req,res)=>{


    /* const category = await Category.findById(req.body.category);
     if (!category){return res.status(400).send('Invalid Category')}*/

    let product = await Product.findOneAndUpdate({_id:req.params.id},{
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured
    },{new: true})
    if(!product){
        return res.status(500).send('the product cannot be found!');
    }
    res.send(product);
})

router.delete('/:id', async(req,res)=>{
    const product = await Product.findByIdAndDelete({_id:req.params.id});
    if(!product){
        return res.status(400).send('the product cannot be found!');
    }
    return res.status(400).json({success:false,error:err});
})

router.get('/get/count', async(req,res)=>{
    const productCount = await Product.countDocuments();
    if(!productCount){
        return res.status(500).json({success:false});
    }
    res.send({productCount});
})


module.exports = router;