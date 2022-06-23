const express = require('express')
const router = express.Router();
const product = require("./product")
const productCategory = require("./productcategory")


router.get("/testconnection", (req,res) =>{
  res.send("HEALTH OK");
})


router.use("/v1", product);
router.use("/v1", productCategory)


module.exports = router