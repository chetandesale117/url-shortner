const express=require('express');
const URL = require('../models/url');
const router=express.Router();

router.get("/",async(req,res)=>{
    try {
        if(!req.user)return res.redirect('/login')
        const allUrls = await URL.find({createdBy:req.user._id});
        return res.render('home', {
            urls: allUrls,
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).send("Internal Server Error");
    }
})

router.get('/signup',(req,res)=>{
    return res.render("signup");
})

router.get('/login',(req,res)=>{
    return res.render("login");
})

router.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await URL.findByIdAndDelete(id);
        res.redirect("/"); 
    } catch (error) {
        console.error("Error deleting URL:", error);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports  = router;