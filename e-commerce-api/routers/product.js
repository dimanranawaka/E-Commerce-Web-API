const express = require('express');
const Product = require("../models/productSchema");
const router = express.Router();
const product = require('../models/productSchema');
router.get(`/`, async (req, res) => {
    const product = await Product.find();
    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
});
router.post(`/`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });

    product.save()
        .then((createdProduct) => {
            console.log('Product saved successfully:', createdProduct);
            res.status(201).json(createdProduct);
        })
        .catch((err) => {
            console.error('Error saving product:', err);
            res.status(500).json({
                error: err,
                success: false
            });
        });
});

module.exports = router;