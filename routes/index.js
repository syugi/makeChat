const express  = require('express');
const router   = express.Router();
const template = require('../views/template.js');		
const index    = require('../views/index.js');		
const db       = require('../model/db_conn.js');

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

router.post('/save', function(req, res, next){
 
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));
	
  const insertProject = "INSERT INTO PROJECT_LIST ( PRJ_ID, PRJ_NM, PRJ_DESC) VALUES (0, ?, ?)";

  db.query(insertProject, [ post.prjNm, post.prjDesc], function(error, result){
    if(error){
      console.error("프로젝트 저장 오류");
      throw error;
    }
     //console.log('견적요청 저장되었습니다.');
      res.redirect( '/');
  });       
  
});

module.exports = router;
