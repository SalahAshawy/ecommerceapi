const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  titel: {
    type: String,
    required: true,
    unique:true
  },
  desc: {
    type: String,
    required:true,
  },
  img:{
    type:String,
    required:true
  },
    categories: {
    type: Array,
   
  },
  size: {
    type: Number,
   
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
   required:true
  },
 
},{timestamps:true}
)


module.exports = mongoose.model('Product', productSchema)