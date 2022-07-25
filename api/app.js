const express = require("express");
const app  =   express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const PostRoute   = require("./routes/posts")
const categoriesRoute = require("./routes/categorys");
const path = require("path");
const multer  = require("multer");
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());
app.use(express.json())

// connecting to the database
dotenv.config({path : '.env'})

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true,
}).then(console.log("connected to  database")).catch((err)=>console.log(err));


const storage = multer.diskStorage({
  destination : (req, file, cb) =>{
    cb(null, "images");
  }, filename : (req, file,cb)=>{
    cb(null, req.body.name);
  }
})


const upload = multer({storage : storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
  res.status(200).json("file have been uploaded")
})

// connecting to  the routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", PostRoute);
app.use("/api/categories", categoriesRoute);


app.listen("5000", ()=>{
  console.log("port is running on port number 5000")
})