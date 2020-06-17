const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const chatRun  = require('../views/chatRun.js');		
const db       = require('../model/db_conn.js');
const is       = require('is-0');
const mysql    = require('mysql');

/* GET home page. */
router.get('/:id', function(req, res, next) {
  
   const prjId = req.params.id;
   const mode  = req.query.mode;
  
   const sql = "SELECT PRJ_ID, PRJ_NM, PRJ_DESC , CHAT_MODE FROM PROJECT_LIST WHERE PRJ_ID = ? ";      
   db.query(sql, [prjId], function(error, prjData){
      if(error){
        throw error;
      }
     
      console.log(prjData);

     if(is.empty(prjData)){
       res.redirect( '/');
       return; 
     }
     
     const sql = "SELECT PROF_ID, PROF_NM, POSITION, FILE_PATH FROM PROF_LIST WHERE PRJ_ID = ? ";   
     db.query(sql, [prjId], function(error, profData){
        if(error){
          throw error;
        }
 
        console.log(profData);
     
        const sql = "SELECT A.CHAT_ID, A.PRJ_ID, A.PROF_ID , A.CHAT_SEQ, A.CHAT_TYPE, A.CHAT_MSG , B.POSITION , 'N' AS REC_STAT FROM CHAT_LIST A LEFT JOIN PROF_LIST B ON A.PRJ_ID = B.PRJ_ID AND A.PROF_ID = B.PROF_ID WHERE A.PRJ_ID = ?";

        db.query(sql, [prjId], function(error, chatData){
            if(error){
              throw error;
            }

            //console.log(chatData);
            //console.log("prjData여기여기111 : ", prjData);
          
            if(!is.empty(mode)){
              prjData[0].MODE = mode;  //채팅실행모드 (1:탭 , 2:스크롤, 3:플레이)
             }
          
            const title  = prjData[0].PRJ_NM;
            const link   = ``;
            const body  = `${chatRun.html(prjData[0],profData,chatData)}`;
            const script = `<script src="/javascripts/chatRun.js"></script>
                            <script>
                              settingData(${JSON.stringify(prjData[0])},${JSON.stringify(profData)},${JSON.stringify(chatData)});
                            </script>
                            `;
            const html   = template.HTML(title,link, body,script);
            res.send(html);
        }); 
     }); 
   });  

});

module.exports = router;
