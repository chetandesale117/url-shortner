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
    visitHistory: [
        {
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const URL=mongoose.model("URL",urlSchema);

module.exports=URL;