const express = require('express');
require("dotenv").config();
const path=require("path");
const {connectToMongoDB}=require('./connect');
const URL=require('./models/url');
const cookieparser=require('cookie-parser')
const app=express();
const urlRoute=require('./routes/url');
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");
const { restrictToLogogedUserOnly, checkAuth } = require('./middleware/auth');
const PORT=process.env.PORT;



connectToMongoDB(process.env.MONGODB_URL).then(()=>{
    console.log("mongodb connected");
    console.log(process.env.MONGODB_URL)
})

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extende:false}));
app.use(cookieparser())


app.use('/url', restrictToLogogedUserOnly,urlRoute);

app.use('/',checkAuth,staticRoute);

app.use('/user',userRoute)
 
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