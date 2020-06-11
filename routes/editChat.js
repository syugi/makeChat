const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const editChat = require('../views/editChat.js');		
const db       = require('../model/db_conn.js');
const is       = require('is-0');
const mysql = require('mysql');

/* GET home page. */
router.get('/:id', function(req, res, next) {
  
   const prjId = req.params.id;
  
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
  //console.log("post --> "+JSON.stringify(post.chatSaveList));
  
  const chatSaveList = JSON.parse(post.chatSaveList);
  //console.log("post111 --> "+chatSaveList[0].chatMsg);
  
  
  const chat_arr = [
   // { prjId: '1', profId: '1', chatSeq: '0' , chatType: 'Msg', chatMsg: '안녕'},
    //{ prjId: '1', profId: '1', chatSeq: '1' , chatType: 'Msg', chatMsg: '반가워'},
   // { prjId: '1', profId: '1', chatSeq: '2' , chatType: 'Msg', chatMsg: '잘부탁해'}
    { prjId: '1', profId: '1', chatSeq: '3' , chatType: 'Msg', chatMsg: '반가워'},
    { prjId: '1', profId: '1', chatSeq: '4' , chatType: 'Msg', chatMsg: '반가워22'}
  ]
  
  const sql = " INSERT INTO CHAT_LIST ( CHAT_ID, PRJ_ID, PROF_ID, CHAT_SEQ, CHAT_TYPE, CHAT_MSG) VALUES ( 0 , ? , ? , ?, ? , ?); ";

  let sqls = "";
  let params = [];
  chat_arr.map( chat => {
    params = [chat.prjId, chat.profId, chat.chatSeq, chat.chatType, chat.chatMsg];
    sqls += mysql.format(sql, params);
  });

  db.query(sqls, function(error, result){
  console.log(sqls);
    if(error){
      throw error;
    }

    res.redirect( `/editchat/${post.prjId}`);
  });      

});

module.exports = router;
