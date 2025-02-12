const mongoose=require("mongoose");
require("dotenv").config();
exports.connect=async ()=> {
    const uri=process.env.MONGODB_URL;
    console.log(uri);
    await mongoose
    .connect(uri,{
        useNewurlParser:true,
        useUnifiedTopology:true,
    })
    
}