var express = require("express");
var app = express();

app.set("port", 8000);
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.get("/", (req, res)=>{
  console.log(req.query.username);
  res.send("hello from default path");
})

app.listen(app.get("port"), () => {
  console.log("Express app is running on port " + app.get("port"));
})

app.post("/addDetail", (req, res)=>{
  console.log(req.body);
  res.send("Post method called successfully");
})

//ASSIGNMENT 1
//CREATE A LOGIN VALIDATION API IN GET METHOD
//SEND USERNAME AND PASSWORD
//VALIDATE IT USING IF ELSE STATEMENT AND SEND A RESPONSE ACCORDINGLY. 


