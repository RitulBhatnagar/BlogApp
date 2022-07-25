const router = require("express").Router();
// const bcyrpt = require("bcrypt");
const Post = require("../models/post")

// Create the new post 
router.post("/", async(req, res)=>{
  const newPost  = new Post(req.body);
  try{
     const SavePost =await  newPost.save();
     res.status(200).json(SavePost);
  } catch(err){
    res.status(500).json(err);
  }
})

// update the post
   router.put("/:id", async(req, res)=>{
    const post = await Post.findById(req.params.id); 
    try
     {
           if(post.username === req.body.username){
                try{
                    const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                          $set : req.body
                    }, { new : true}
                    );
                    res.status(200).json(updatePost);
                }catch(err){
                    res.status(500).json(err);
                    console.log(err);
                }
           }else{
             res.status(401).json("you can only update your post only")
           }
     }
     catch(err){
       res.status(500).json(err);
     }
   })
   // delete the post

   router.delete("/:id", async(req, res)=>{
    const post = await Post.findById(req.params.id); 
    try
     {
           if(post.username === req.body.username){
                try{
                   await post.delete();
                   res.status(200).json("POst has been deleted")
                }catch(err){
                    res.status(500).json(err);
                }
           }else{
             res.status(401).json("you can only update your post only")
           }
     }
     catch(err){
       res.status(500).json(err);
     }
   })


   // get the post 

   router.get("/:id", async(req, res)=>{
    const post = await Post.findById(req.params.id); 
     try{
          res.status(200).json(post)
     }
     catch(err){
           res.status(401).json(err)
     }
   })

   // GET ALL THE POST
   const User = require("../models/user")

   router.get("/", async(req, res)=>{
    const username = req.query.user;
    const catName = req.query.cat ;
     try{
          let posts;
          if(username){
            posts = await Post.find(username)
          }
          else if(catName){
            posts = await Post.find({categories :{
              $in : {catName}
            }})
          }  else{
            posts = await  Post.find();
          }
          res.status(200).json(posts);
     }
     catch(err){
           res.status(401).json(err)
     }
   })

module.exports = router