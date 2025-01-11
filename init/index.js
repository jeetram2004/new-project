const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require("../models/listing.js")

MONGO_URL = "mongodb://localhost:27017/wanderlust"

main().then(()=>{
    console.log("connected to db");
    
}).catch((error)=>{
    console.log("error is occuring");
});

async function main() {
    await mongoose.connect(MONGO_URL)
}

const initDB = async ()=>{
    await Listing.deleteMany({})
    await Listing.insertMany(initData.data)
    console.log("data initialized");
    
}

initDB()


