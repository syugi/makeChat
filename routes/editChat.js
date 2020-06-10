const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const editChat = require('../views/editChat.js');		
const db       = require('../model/db_conn.js');
const is       = require('is-0');

/* GET home page. */
router.get('/', function(req, res, next) {
  
   const prjId = req.query.id;
  
   const sql = "SELECT PRJ_ID, PRJ_NM, PRJ_DESC FROM PROJECT_LIST WHERE PRJ_ID = ? ";      
   db.query(sql, [prjId], function(error, prjData){
      if(error){
        throw error;
      }
     
      console.log(prjData);

     const sql = "SELECT PROF_ID, PROF_NM, POSITION, FILE_PATH FROM PROF_LIST WHERE PRJ_ID = ? ";   
     db.query(sql, [prjId], function(error, profData){
        if(error){
          throw error;
        }

        console.log(profData);
     
        const sql = "SELECT A.CHAT_ID, A.PRJ_ID, A.PROF_ID , A.CHAT_SEQ, A.CHAT_TYPE, A.CHAT_MSG , B.PROF_NM, B.POSITION, B.FILE_PATH FROM CHAT_LIST A LEFT JOIN PROF_LIST B ON A.PRJ_ID = B.PRJ_ID AND A.PROF_ID = B.PROF_ID WHERE A.PRJ_ID = ?";

        db.query(sql, [prjId], function(error, chatData){
            if(error){
              throw error;
            }

            //console.log(chatData);
                  
            const title  = "Make Chat";
            const link   = ``;
            const body  = `${editChat.html(prjData[0],profData,chatData)}`;
            const script = `<script src="/javascripts/editChat.js"></script>
                            <script>
                               settingProf('${profData[0].PROF_ID}','${profData[0].PROF_NM}','${profData[0].POSITION}','${profData[0].FILE_PATH}');

                               settingChat(chatData);
                            </script>
                            `;
            const html   = template.HTML(title,link, body,script);
            res.send(html);
        }); 
     }); 
   });  

});

router.post('/save', function(req, res, next){
	
	
 
  //견적요청
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));
	
  //res.redirect( `/editchat?id=${post.prjId}`);
  
  // // ID 생성
  // const selectReqId = "SELECT MAX(IFNULL(REQ_ID,0))+1 AS REQ_ID FROM REQ_QUOTE_LIST";
  // db.query(selectReqId, [], function(error, result){
  //   if(error){
  //     console.error("ID 생성 오류");
  //     throw error;
  //   }
    
  //   // let reqId = result[0].REQ_ID;
  //   //  if(is.empty(reqId)){
  //   //    reqId = 0;
  //   //  }
  //   // console.log("생성된 ID : "+reqId);
  //   // const reqDate  =  dateformat.asString('yyyyMMdd', new Date()); //요청일자
  // });       
  
});

module.exports = router;
