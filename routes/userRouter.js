const express =require('express');
const User = require("../models/user")
const { vertifyTokenAndAuthorization, vertifyTokenAndAdmin } = require('./vertifyToken');
const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("from user ")
// });
// router.post("/",(req,res)=>{
//     const user =req.body.user;
//     console.log(user);
    
// });

//Update A user

router.put("/:id",vertifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){ 
        req.body.password =crypto.AES.encrypt(req.body.password,process.env.ENC_KEY).toString();
    }
    try {
     const UpdatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});  
     res.status(201).json({
        status:"success",
        data:UpdatedUser
     })   
    } catch (error) {
        res.status(401).json(err)    
    }
   


})
 //Get A User
router.get("/find/:id",vertifyTokenAndAuthorization,async(req,res)=>{

    try {
     const user = await User.findById(req.params.id); 
     const {password, ...others}=user._doc; 
     res.status(200).json({
        status:"success",
        data:others
     })   
    } catch (err) {
        res.status(401).json(err)    
    }
})
// Get All Users
router.get("/",vertifyTokenAndAdmin,async(req,res)=>{
    
    try {
        const query =req.query.new;
        
    const users = query ? await User.find().limit(1):await User.find() ;
     res.status(200).json({
        status:"success",
        data:users
     })   
    } catch (err) {
        res.status(401).json(err)    
    }
   


})

router.delete("/:id",vertifyTokenAndAdmin,async(req,res)=>{
    try {
      await User.findByIdAndDelete(req.params.id);  
     res.status(200).json("deleted successfully ")   
    } catch (error) {
        res.status(401).json(err)    
    }

})
router.get("/stats", vertifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  



module.exports=router;