const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Product = require('./models/productSchema');
// Middleware
app.use(bodyParser.json());

app.use(morgan('tiny'));

require('dotenv/config');

const api = process.env.API_URL;
console.log(`API URL: ${api}`);

app.get(`${api}/products`, async (req, res) => {
    const product = await Product.find();
    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
});
app.post(`${api}/products`, (req, res) => {
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
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'e-shop'

})
.then(()=>{
    console.log('Connected to database');
})
.catch((err)=>{
        console.log(err);
})

app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.listen(3000, ()=>{
    console.log('Server is running on port 3000 http://localhost:3000/');
})