var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, response, next) {
  var connection=req.app.get("connection");
  console.log(connection);
  connection.beginTransaction(function(err){
      if(err)
      response.send(err)
      else{
        var reqParams=req.body.data;
        var query="update books set active =0 where isbn=?";
       var q= connection.query(query,[reqParams.isbn],function(err,result){
            if(err){
                connection.rollback(function(error){
                    response.status=500;
                    response.send(err);
                })
            }
            else{
                connection.commit(function(){
                    response.status=200;
                    response.send("success");
                });
            }
        });
        console.log(q.sql)
      }
  });
  
});

module.exports = router;
