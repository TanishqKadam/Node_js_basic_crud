const express = require("express");
const MenuItem = require("../models/Menu");
const router = express.Router()

router.post("/", async (req, res) => {
  try {
    //get the menu data from req.body
    const data = req.body;

    const NewMenu = new MenuItem(data);
    const responce = await NewMenu.save();
    console.log("menu saved sucessfully");
    res.status(200).json(responce);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/:taste',async (req,res)=>{
    try {
        const data = req.params.taste;
    if(data == 'sweet' || data == 'spicy' || data =='sour'){
        const responce = await MenuItem.find({taste:data});
        console.log('item found');
        res.status(200).json(responce);
    }
    } catch (error) {
        console.log(error);
        res.status(404).json({error:'not found'});
    }
})


module.exports = router;