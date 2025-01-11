
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override")


MONGO_URL = "mongodb://localhost:27017/wanderlust"

main().then(()=>{
    console.log("connected to db");
    
}).catch((error)=>{
    console.log("error is occuring");
});

async function main() {
    await mongoose.connect(MONGO_URL)
}

app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))

//index route
app.get("/listing", async (req,resp)=>{
   const allListings =  await Listing.find({})
    resp.render("listings/index.ejs",{allListings})
})
//new route

app.get("/listings/new",(req,resp)=>{
    resp.render("listings/new.ejs")
})

app.post("/listings",async (req,resp)=>{
    const newListing = new Listing(req.body.listing)
    await  newListing.save();
    resp.redirect("/listing")

})
//edit route

app.get("/listing/:id/edit", async(req,resp)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id)
    resp.render("listings/edit.ejs",{listing})
})


app.put("/listing/:id/", async (req,resp)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
     resp.redirect("/listings")
})

//show route
app.get("/listing/:id", async (req,resp)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id)
    resp.render("listings/show.ejs",{listing})

})

//new route


// app.get("/testListing", async (req,resp)=>{
//     let sampleListing =  new Listing({
//         title:"my new villa",
//         description:"By the beach",
//         price:1300,
//         location:"kerala",
//         country:"india"

//     });
//      await sampleListing.save();
//      console.log("sample was saved ");
//      resp.send("testing successful")
     
// })

app.get("/",(req,resp)=>{
    resp.send("root is working ");
    
})
app.listen(8080,()=>{
    console.log("server is listening ");
    
})





















