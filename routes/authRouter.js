const express =require('express');
const crypto =require('crypto-js');
const router = express.Router();
const User = require('../models/user');
const jwt =require('jsonwebtoken');



//Register 

router.post('/register',async (req,res)=>{
    const user =new User({
    email :req.body.email,
    password :crypto.AES.encrypt(req.body.password,process.env.ENC_KEY).toString(),
    username :req.body.username,
    });

    try {
      savedUser= await user.save();
       res.status(201).json({
        status:"success",
        data:savedUser
       });
    } catch (error) {
        res.status(500).json({
            status:"fail",
            error
        })
        console.log(error);
    }
});

//Login 

router.post('/login',async (req,res,next)=>{

    try {
        const user = await User.findOne({username:req.body.username});
        if(!user){
           res.status(401).json("wrong creditionals"); 
        }
        const originalPassword= crypto.AES.decrypt(user.password,process.env.ENC_KEY).toString(crypto.enc.Utf8);
        if(req.body.password!==originalPassword){
        res.status(401).json("wrong creditionals pas"); 
        }else{
            const accessToken = jwt.sign({
                id:user._id ,
                isAdmin:user.isAdmin   
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
            );
            const {password, ...others}=user._doc;
        res.status(200).json({
            status:"success",
            data:others,
            accessToken
           });
        }    
    } catch (error) {
        
        res.status(500).json({
            status:"fail",
            error
        })
        console.log(error);
    }
});

module.exports=router;