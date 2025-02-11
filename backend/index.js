//app create
const cors=require("cors")
const express=require("express");
const app=express();
app.use(cors({origin:"https://incloud-frontend.vercel.app/"}));
// PORT find kro 

require("dotenv").config();
const PORT=process.env.PORT || 3000;

//midlleware add krna hai  


app.use(express.json());
const fileupload=require("express-fileupload");
app.use(
    fileupload({
        useTempFiles: true, // Enables temporary file storage
        tempFileDir: "/tmp/", // Temporary directory for uploaded files
    })
);

// db se connect

const db =require("./config/database");
db.connect()

// cloud se connect 

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mounting
const Upload=require("./routes/FileUpload")
const authRoutes=require("./routes/userRoute")

app.use('/api/auth', authRoutes);
app.use('/api/auth/upload',Upload);
//activating server
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
});