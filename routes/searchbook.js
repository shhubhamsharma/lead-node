var express = require('express');
var router = express.Router();

router.post('/', function(req, response, next) {
    reqParam=req.body.data.searchQuery;
    var query="SELECT * from books where active=1 and (title like '%"+reqParam+"%' or isbn like '%"+reqParam+"%'or author like'%"+reqParam+"%' or pub_date like'%"+reqParam+"%');"
    var connection=req.app.get("connection");
    
    var q=connection.query(query,function(err,resp){
      if(err){
          response.status=500;
      }
      if(resp==null){
          response.status=400;
          response.send("No book found");
      }
      else{
          response.status=200;
          response.send(resp);
      }
    });
    console.log(q.sql)
  });


  module.exports = router;
