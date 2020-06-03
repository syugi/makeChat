const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const index    = require('../views/index.js');		
const db       = require('../model/db_conn.js');
const is       = require('is-0');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const sql = "SELECT PRJ_ID, PRJ_NM, PRJ_DESC FROM PROJECT_LIST A ORDER BY PRJ_ID";
        
   db.query(sql, [], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);

      const title  = "Make Chat";
      const link   = ``;
      const body  = `${index.html(result)}`;
      const script = `<script src="/javascripts/script.js"></script> `;
      const html   = template.HTML(title,link, body,script);
      res.send(html);
     
   });  

});

router.get('/delete', function(req, res, next) {
  
   const sql = "DELETE FROM PROJECT_LIST WHERE PRJ_ID = ?";
        
   db.query(sql, [req.query.id], function(error, result){
      if(error){
        throw error;
      }
     
     console.log(result);

      res.redirect( '/');
     
   });  

});

router.post('/save', function(req, res, next){
 
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));
	
  
  //Insert  
  if(is.empty(post.prjId)){

    const insertProject = "INSERT INTO PROJECT_LIST ( PRJ_ID, PRJ_NM, PRJ_DESC) VALUES (0, ?, ?)";
    db.query(insertProject, [ post.prjNm, post.prjDesc], function(error, result){
      if(error){
        console.error("Project Update Error!!");
        throw error;
      }
        res.redirect( '/');
    });  

  //Udate
  }else{
    const updateProject = "UPDATE PROJECT_LIST SET PRJ_NM = ? , PRJ_DESC = ? WHERE PRJ_ID = ?";
    db.query(updateProject, [ post.prjNm, post.prjDesc, post.prjId], function(error, result){
      if(error){
        console.error("Project Insert Error!!");
        throw error;
      }
        res.redirect( '/');
    });  
  }  
  
});

module.exports = router;
