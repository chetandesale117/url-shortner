const { Timestamp } = require('bson');
const mongoose=require('mongoose');
const { type } = require('os');
const { types } = require('util');

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        Unique:true
    },
    redirectURL:{
        type:String,
        require:true
    },
    visitHistory:[{
        Timestamp:{
            type:Number
        }
    }],
},
    {timestamps:true}
)

const URL=mongoose.model("url",urlSchema);

module.exports=URL;