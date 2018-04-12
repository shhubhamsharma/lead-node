var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, response, next) {
  var query="SELECT * from books where active=1"
  var connection=req.app.get("connection");
  connection.query(query,function(err,resp){
    if(err){
        response.statusCode=500;
        response.send("Error While Fetching book");
    }
    else{
        if(resp==null){
            response.status=400;
            response.send("No book found");
        }
        else{
            response.status=200;
            response.send(resp);
        }    
    }
  });
});




module.exports = router;
