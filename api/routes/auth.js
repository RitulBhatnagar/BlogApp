const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
// Register

router.post("/register", async(req, res)=>{
  try{
    const salt  = await  bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username : req.body.username,
      email : req.body.email,
      password : hashPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  }catch(err){
    res.status(500).json(err);
    console.log(err);
  }
})


// login

router.post("/login", async(req, res)=>{
  try{
      const user = await User.findOne({
        username :  req.body.username,
      })
      !user && res.status(400).json("Wrong Credentials")
      console.log(req.body.password);
      const validated = await bcrypt.compare(req.body.password, user.password);
      console.log(user.password)
      
      !validated && res.status(400).json("wrong credentials")
     const {password, ...others} = user._doc;
     res.status(200).json(others);
  }catch(err){
    console.log(err);
  }
})

module.exports = router; 