const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const editChat = require('../views/editChat.js');		
const db       = require('../model/db_conn.js');
const is       = require('is-0');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const sql = "SELECT PRJ_ID, PRJ_NM, PRJ_DESC FROM PROJECT_LIST WHERE PRJ_ID = ? ";
        
   db.query(sql, [req.query.id], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);

      const title  = "Make Chat";
      const link   = ``;
      const body  = `${editChat.html(result[0])}`;
      const script = `<script src="/javascripts/editChat.js"></script> `;
      const html   = template.HTML(title,link, body,script);
      res.send(html);
      
   });  

});

module.exports = router;
