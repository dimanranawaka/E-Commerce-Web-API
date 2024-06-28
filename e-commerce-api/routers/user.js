const express = require('express');
const router = express.Router();
const {User} = require('../models/userSchema');
const bcrypt = require('bcryptjs');

router.get(`/`,async (req,res)=>{
    const userList = await User.find();
    if(!userList){
        res.status(500).json({success:false});
    }
    res.send(userList);
})

router.post('/', async (req,res)=>{
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash:bcrypt.hashSync(req.body.password,pk=2),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country
    });
    user = await user.save();
    if(!user){
        return res.status(400).send('the user cannot be created');
    }
    res.send(user);
})

module.exports = router;