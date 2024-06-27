const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// productRouter
const productRouter = require('./routers/product');

// Enabling CORS
app.use(cors());
app.options('*',cors());

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

const api = process.env.API_URL;
console.log(`API URL: ${api}`);

// Routers
app.use(`{api}/products`, productRouter);

// Database connection
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