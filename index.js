const express =require('express');
 const userRouter =require('./routes/userRouter');
const authRouter =require('./routes/authRouter');
const cartRouter =require('./routes/cartRouter');
 const productRouter =require('./routes/productRouter');
 const orderRouter =require('./routes/orderRouter');
const app =express();
const mongoose =require('mongoose');
const dotenv =require('dotenv');
dotenv.config();

app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connceted successfully ');
}).catch((err)=>{
    console.log(err);
});

//Routes 

app.use("/api/auth", authRouter);
 app.use("/api/users", userRouter);
 app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
 app.use("/api/orders", orderRouter);


//app listening
app.listen(process.env.PORT||5000,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})