const express = require('express');
const router = express.Router();

const db = require("../db")
const COLLECTIONS = require("../utils/database");
const ObjectID = require("mongodb").ObjectId



router.post("/addproduct", (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  var newProduct = {
    "product_name": req.body.product_name,
    "product_price": parseFloat(req.body.product_price),
    "product_img": "",
    "created_on": new Date(),
    "category_id": new ObjectID(req.body.category_id)
  }


  db.collection(COLLECTIONS.db.PRODUCT).insertOne(newProduct, (err, doc) => {
    if (err) {
      res.json({ status: false, message: "Error while inserting " + err });
    } else {
      res.json({ status: true, message: "Data added successfully" });
    }
  })
})


router.get("/product", (req, res) => {


  //var cursor = db.collection(COLLECTIONS.db.PRODUCT).find({});


  var cursor = db.collection(COLLECTIONS.db.PRODUCT).aggregate([
    { $match: {} },
    { $lookup: { from: COLLECTIONS.db.PRODUCTCATEGORY, localField: "category_id", foreignField: "_id", as: "category_details" } },
    { $unwind: "$category_details" },
    {
      $project: {
        "_id" : 1,
        "product_name" : 1,
        "product_price" : 1,
        "category_details.category_name" :1
      }
    }
  ])

  var result = [];
  cursor.forEach(
    (doc, err) => {
      if (err) {

      } else {
        result.push(doc);
      }
    }, () => {
      res.json({ status: true, message: "Data found", result: result });
    }
  )
})


module.exports = router;