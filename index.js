var express = require("express");
var app = express();
let cors = require("cors");
var db = require("./db");

var routes = require("../batch15_be/routes/index")

db.connect(() => {
  app.listen(app.get("port"), () => {
    console.log("Express app is running on port " + app.get("port"));
  })
})

app.set("port", 8000);
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use("/api", routes);






app.get("/", (req, res) => {
  console.log(req.query.username);
  res.send("hello from default path");
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


//ASSIGNMENT3
//CREATE QUERIES FOR GET AND PUT AND DELETE METHOD and update the data to the local arraylist


//ASSIGNMENT4
//CREATE MONGODB  AND CONNECT IT USING MONGODB COMPASS. CREATE A DB CLASS TO CONNECT YOUR APP TO MONGODB.



const users = [];
var id = 0;

app.post("/users", (req, res) => {
  var username = req.body.username
  var password = req.body.password
  var email = req.body.email
  var name = req.body.name

  console.log("api called");

  if (users.length > 0) {
    for (var user of users) {
      if (user.username == username) {
        res.json({ status: false, message: "username exists" });
        return;
      }
    }
  }

  var newUser = {
    "username": username,
    "password": password,
    "email": email,
    "name": name
  }
  id++;
  users.push(newUser);
 

  db.collection("users").insertOne(newUser, (err, doc)=>{
    if(err){
      console.log(err);
      res.json({status:false, message:"Error occured while inserting data"});
    }else{
      res.json({ status: true, message: "User added successfully" });
    }
  })

})

app.get("/users", (req, res) => {

  var nameQuery = req.query.name;
  if (nameQuery != null && nameQuery != undefined && nameQuery != "") {
    for (var user of users) {
      if (user.name.toLowerCase() == nameQuery.toLowerCase()) {
        res.json({ status: true, message: "user found", result: user });
        return;
      }
    }
  }

  res.json({ status: true, message: "Users found", result: users });
})


app.put("/users", (req, res) => {
  var idToBeChanged = parseInt(req.body.id);
  var newEmail = req.body.email;
  var newName = req.body.name;
  var newUserName = req.body.username
  var newPassword = req.body.password
  for (var user of users) {
    if (user.id == idToBeChanged) {
      var newUser = {
        id: user.id,
        name: newName,
        email: newEmail,
        username: newUserName,
        password: newPassword,
      }

      users.pop(user);
      users.push(newUser);
      res.json({ status: true, message: "user data updated" });
      return;
    }
  }

  res.json({ status: false, message: "no user found for this id" });

})