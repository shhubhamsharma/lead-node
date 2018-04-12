var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, response, next) {
  var query="SELECT name,email,password as token from users where email=? and password=MD5(?);"
  var connection=req.app.get("connection");
  connection.query(query,[req.body.data.email,req.body.data.password],function(err,resp){
    if(err){
      response.statusCode=500;
      response.send("Error")
    }
    else{
      response.statusCode=200;
      response.send(resp)
    }
  });
});

module.exports = router;
