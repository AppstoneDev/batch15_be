const mongoclient = require("mongodb").MongoClient
let server = null

const DBURL = "mongodb+srv://nextstacks:nextstacks123@batch15.qteim.mongodb.net/batch15?retryWrites=true&w=majority";

const connect = (callBack) =>{
  mongoclient.connect(DBURL, {useUnifiedTopology : true}, (err, db)=>{
    if(err){
      console.log(err);
      console.log("error in connecting to db");
    }else{
      console.log("app is connected to database");
      server = db
      callBack();
    }
  })
}

function collection(value){
  return server.db().collection(value);
}


module.exports ={
  connect, 
  collection
}