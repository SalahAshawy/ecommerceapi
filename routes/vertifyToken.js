const jwt =require('jsonwebtoken');

const vertifyToken  =(req,res,next)=>{
    const authHeader =req.headers.token;
    if(authHeader){
        const token =authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("token not valid");
            req.user=user
            next();
        })
    }
    else{
    res.status(401).json("you arnt authanticate!")
}
};
const vertifyTokenAndAuthorization =(req,res,next)=>{
    vertifyToken(req,res,()=>{
       if(req.user.id===req.params.id||req.user.isAdmin){
        next();
       } 
       else {
        res.status(403).json("you have no acccess to do that !");
       }    
    });
};

const vertifyTokenAndAdmin =(req,res,next)=>{
    vertifyToken(req,res,()=>{
       if(req.user.isAdmin){
        next();
       } 
       else {
        res.status(403).json("you have no acccess to do that !");
       }    
    });
};

module.exports= {vertifyToken,vertifyTokenAndAuthorization,vertifyTokenAndAdmin};