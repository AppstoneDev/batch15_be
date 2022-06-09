var express = require("express");
var app = express();

app.set("port", 8000);
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.query.username);
  res.send("hello from default path");
})

app.listen(app.get("port"), () => {
  console.log("Express app is running on port " + app.get("port"));
})

app.post("/addDetail", (req, res) => {
  console.log(req.body);
  res.send("Post method called successfully");
})

//ASSIGNMENT 1
//CREATE A LOGIN VALIDATION API IN GET METHOD
//SEND USERNAME AND PASSWORD
//VALIDATE IT USING IF ELSE STATEMENT AND SEND A RESPONSE ACCORDINGLY. 


//ASSIGNMENT2
//STORE USER CREDENTIALS IN A ARRAY
//USE A API TO SIGNUP AND VALIATE AND SECOND API TO LOGIN RETURN THE USER DETAILS





const users = [];

app.post("/signup", (req, res) => {
  var username = req.body.username
  var password = req.body.password
  var email = req.body.email
  var name = req.body.name
  
  console.log("api called");

  if(users.length > 0){
    for (var user of users){
      if(user.username == username){
        res.json({status:false, message:"username exists" });
        return;
      }
    }
  }

    var newUser = {
      "username" : username,
      "password" : password,
      "email" :email,
      "name": name
    }

    users.push(newUser);
    res.json({status:true, message:"User added successfully"});
  
})