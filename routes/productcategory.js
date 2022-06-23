const express = require('express');
const router = express.Router();

const db = require("../db")
const COLLECTIONS = require("../utils/database");
const { route } = require('./product');
const ObjectID = require("mongodb").ObjectId


router.post("/add_product_category", (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty("category_name")) {

    var newCategory = {
      category_name: req.body.category_name,
      category_img: "",
      created_on: new Date(),
      active: true,
    }

    db.collection(COLLECTIONS.db.PRODUCTCATEGORY).insertOne(newCategory, (err, result) => {
      if (err) {
        res.json({ status: false, message: "Error in inserting" });
      } else {
        res.json({ status: true, message: "Data added successfully" });
      }
    })

  } else {
    res.json({ status: false, message: "Category ID paramerter missing" });
  }
})

router.post("/edit_product_category", (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body));
  if(req.body.hasOwnProperty("category_id")){
    var catID = req.body.category_id;

    var catName = req.body.category_name
    var catImg = req.body.category_img

    db.collection(COLLECTIONS.db.PRODUCTCATEGORY).updateOne({"_id" : new ObjectID(catID)}, {
      $set:{
        category_name : catName,
        category_img : catImg,
        last_modified : new Date()
      }
    }, {$upsert:false}, (err, doc)=> {
      if(err){
        res.json({status:false,message: "unable to update document"})
      }else{
        res.json({status:true, message: "document updated"});
      }
    })

  }else{
    res.json({status:false, message:"category id parameter is missing"});
  }
})


module.exports = router;