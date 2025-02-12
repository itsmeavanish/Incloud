const mongoose=require("mongoose");
require("dotenv").config();
exports.connect=async ()=> {
    const uri="mongodb+srv://avanishupadhyay633:CwXjVf586oQTfRCd@cluster0.c80t1.mongodb.net/mediauploader";
    console.log(uri);
    await mongoose
    .connect(uri,{
        useNewurlParser:true,
        useUnifiedTopology:true,
    })
    
}