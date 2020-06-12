const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const editChat = require('../views/editChat.js');		
const db       = require('../model/db_conn.js');
const is       = require('is-0');
const mysql    = require('mysql');
const multer   = require('multer');	

/* File Upload */
const storage = multer.diskStorage({ 
  destination(req, file, callback) { 
    callback(null, 'public/uploads'); 
  }, 
  filename(req, file, callback) { 
    let array = file.originalname.split('.'); 
    const result =  Date.now().toString() +'.' + array[1];
    console.log(">>>result :  "+result); 
    callback(null, result); 
  } 
}); 

const upload = multer({ 
  storage, 
  limits: { 
    files: 10, fileSize: 1024 * 1024 * 1024, 
  } 
});

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
     
        const sql = "SELECT A.CHAT_ID, A.PRJ_ID, A.PROF_ID , A.CHAT_SEQ, A.CHAT_TYPE, A.CHAT_MSG , B.POSITION , 'N' AS REC_STAT FROM CHAT_LIST A LEFT JOIN PROF_LIST B ON A.PRJ_ID = B.PRJ_ID AND A.PROF_ID = B.PROF_ID WHERE A.PRJ_ID = ?";

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
                              settingData(${JSON.stringify(prjData[0])},${JSON.stringify(profData)},${JSON.stringify(chatData)});

                            </script>
                            `;
            const html   = template.HTML(title,link, body,script);
            res.send(html);
        }); 
     }); 
   });  

});

router.post('/save', upload.single('img_file'), function(req, res, next){
	
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));
  
  const prjId = post.prjId;
  const chatSaveList   = JSON.parse(post.chatSaveList);
  const chatDeleteList = JSON.parse(post.chatDeleteList);
  
  let sqls = "";
  let params = [];
  
  const insertSql = " INSERT INTO CHAT_LIST ( CHAT_ID, PRJ_ID, PROF_ID, CHAT_SEQ, CHAT_TYPE, CHAT_MSG) VALUES ( 0 , ? , ? , ?, ? , ?); ";

  chatSaveList.map( chat => {
    params = [prjId, chat.PROF_ID, chat.CHAT_SEQ, chat.CHAT_TYPE, chat.CHAT_MSG];
    sqls += mysql.format(insertSql, params);
  });
  
  const deleteSql = " DELETE FROM CHAT_LIST WHERE PRJ_ID = ? AND CHAT_SEQ = ? ; ";

  chatDeleteList.map( chat => {
    params = [prjId, chat.CHAT_SEQ];
    sqls += mysql.format(deleteSql, params);
  });

  db.query(sqls, function(error, result){
  console.log(sqls);
    if(error){
      throw error;
    }

    res.redirect( `/editchat/${prjId}`);
  });      

});

module.exports = router;
