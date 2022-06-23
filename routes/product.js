const express = require('express');
const router = express.Router();




router.post("/addproduct", (req, res) => {
  console.log(req.body);
})


module.exports = router;