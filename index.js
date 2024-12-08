const express = require('express');
const {connectToMongoDB}=require('./connect');
const URL=require('./models/url');
const app=express();
const urlRoute=require('./routes/url');
const PORT=8000;



connectToMongoDB('mongodb://localhost:27017/url-shortner').then(()=>{
    console.log("mongodb connected");
})

app.use(express.json());
app.use('/url',urlRoute);

app.get('/:shortId', async(req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
    },
})
    res.redirect(entry.redirectURL);
   
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})