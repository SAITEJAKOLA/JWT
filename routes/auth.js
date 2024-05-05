const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');
require("dotenv").config();
const {users} = require("../db");


router.get('/allusers',(req, res)=>{
    res.json(users);
})
//validations for email and password.
const emailValidation = check("email", "Please provide an valid email!!").isEmail()
const passwordValidation = check("password", "Please provide a password with length greater than 6!!").isLength({min:6, max:16})

//SigngUp Post call
router.post('/signup',[emailValidation, passwordValidation],async (req, res)=>{
    const {email, password} = req.body
    const secret = process.env.SECRET;
    //validated the input
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({success: false, message:'Validation Failed', errors: errors})
        
    }
    //validated if the user doesnt already exist
    let user = users.find((user)=> user.email === email)
    if(user){
        return res.status(400).json({sucess:false, errors: [{message:"User already exists!!"}]})    
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    users.push({
    email,
    password: hashedPassword
    })
    //need to pass the payload & secret and any additional options
    const token = await JWT.sign({email},secret,{expiresIn:36000})
    console.log(token);
    res.json({success: true, message:'Signup compeleted', token: token})
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const secret = process.env.SECRET;
    let user = users.find((user)=> user.email===email);
    if(!user){
        return res.status(400).json({sucess:false, errors: [{message:"Invalid Credentials!!"}]}) 
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({sucess:false, errors: [{message:"Invalid Credentials!!"}]}) 
    }
    const token = await JWT.sign({email},secret,{expiresIn:36000})
    console.log(token);
    res.json({success: true, message:'Login Succesfull!!', token: token})
})

module.exports = router;