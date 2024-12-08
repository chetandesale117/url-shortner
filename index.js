const express = require('express');
const {connectToMongoDB}=require('./connect');
const fs=require('fs');
const app=express();
const urlRoute=require('./routes/url');
const PORT=8000;



connectToMongoDB('mongodb://localhost:27017/url-shortner').then(()=>{
    console.log("mongodb connected");
})

app.use(express.json());
app.use('/url',urlRoute);

app.get('/u',(req,res)=>{
    res.send('no was thre');
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})