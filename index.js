var express = require("express");
var app = express();

app.set("port", 8000);

app.get("/", (req, res)=>{
  console.log(req.query.username);
  res.send("hello from default path");
})

app.listen(app.get("port"), () => {
  console.log("Express app is running on port " + app.get("port"));
})