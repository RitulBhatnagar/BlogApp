const router = require("express").Router();
const User = require("../models/user");
const bcyrpt = require("bcrypt");
const Post = require("../models/post")
const { findOneAndDelete, findByIdAndDelete } = require("../models/user");

// Updater
router.put("/:id", async(req,res)=>{
  if(req.body.userId===req.params.id){
    const Salt = await bcyrpt.genSalt(10);
       req.body.password = await bcyrpt.hash(req.body.password, Salt);
    try{
       const updatedUser = await User.findByIdAndUpdate(req.params.id, {
         $set : req.body
       }, {new :  true});
       res.status(200).json(updatedUser);
      }
    catch(err){
      res.status(400).json(err);
    }
  }
  else{
    res.status(401).json("You can only update the current account")
  }
})

// delete the user 
router.delete("/:id", async(req, res)=>{
     if(req.body.userId === req.params.id){
       const user = await User.findById(req.params.id);
       if(user){
        try{
          await Post.DeleteMany({username : user.username})
          await User.findByIdAndDelete(req.params.id)
          res.status(200).json("user has been deleted");
   }
   catch(err){
     res.status(401).send(err)
      }
    }else{
       res.status(500).send("you can delete only your account")
     }
    }
  })

   // get user

   router.get("/:id", async(req, res)=>{
     try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc
        res.status(200).json(others);
     }
     catch(err){
           res.status(500).json(err);
     }
   })
module.exports = router