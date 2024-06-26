const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv/config');

const api = process.env.API_URL;

// Middleware
app.use(bodyParser.json());

app.post(`${api}/products`,(req,res)=>{
    const product = req.body;
    console.log(product);
});

app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.listen(3000, ()=>{
    console.log('Server is running on port 3000 http://localhost:3000/');
})