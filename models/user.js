const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:Number,
        require:true
    }
},{timestamps:true})

const User=mongoose.model('user',userSchema);

module.exports=User;