const router = require("express").Router();
const categories = require("../models/category");

router.post("/", async(req, res)=>{
  const newCat = new categories(req.body);
  try{
       const savedCat  =  await newCat.save();
       res.status(200).json(savedCat);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
})


// get all the category
router.get("/", async(req,res)=>{
  try{
     const cat = await categories.find();
     res.status(200).json(cat);

  }catch(err){
    console.log(err);
  }
})

// delete the category

router.delete("/:id", async(req, res)=>{
  if(req.body.userId===req.params.id){
    try{
      const findCat = await categories.findByIdAndDelete(req.params.id);
       res.status(200).json(`categorie has been deleted`);
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  }
})

module.exports = router;