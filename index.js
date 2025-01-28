const express = require('express');
require("dotenv").config();
const path=require("path");
const {connectToMongoDB}=require('./connect');
const URL=require('./models/url');
const app=express();
const urlRoute=require('./routes/url');
const staticRoute=require("./routes/staticRouter");
const PORT=process.env.PORT;



connectToMongoDB(process.env.MONGODB_URL).then(()=>{
    console.log("mongodb connected");
})

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extende:false}));


app.use('/url',urlRoute);

app.use('/',staticRoute);
 
app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    try {

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );
        if (!entry) {
            console.log(`No entry found for shortId: ${shortId}`);
            return res.status(404).send("Short URL not found");
        }
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
});

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})