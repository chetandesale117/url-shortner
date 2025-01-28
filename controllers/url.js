const URL=require('../models/url');
const shortid=require('shortid')

async function handleGenerateNewShortUrl(req,res){
    const body=req.body;
    if(!req.body){
        return res.status(400).json({error:"url required"})
    }
    const shortId=shortid();

    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
    })
    return res.render('home',{
        id:shortId,
    }); 
    //return res.json({});
}

async function handleGetAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}

module.exports={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}