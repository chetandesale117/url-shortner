
require("dotenv").config();
const mongoose=require('mongoose');

async function connectToMongoDB(uri) {
    return mongoose.connect(uri);
}

module.exports={
    connectToMongoDB,
}