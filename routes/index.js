const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const index    = require('../views/index.js');	
const db       = require('../model/db_conn.js');
const is       = require('is-0');

/* GET home page. */
router.get('/', function(req, res, next) {
  
	console.log("로그인 !확인! req.session ====> ",req.session);
	if(req.session.isLogined){
		res.redirect( '/list');
	}else{
		res.redirect( '/user/login');	
	}
	
});

router.get('/list', function(req, res, next) {
  
	const userId = req.session.user_id;
	
  const sql = "SELECT PRJ_ID, PRJ_NM, PRJ_DESC , CHAT_MODE FROM PROJECT_LIST A WHERE USER_ID = ? AND REC_STAT <> 'D' ORDER BY PRJ_ID";
        
   db.query(sql, [userId], function(error, result){
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
  
	const userId = req.session.user_id;
	
  const sql = "UPDATE PROJECT_LIST SET REC_STAT = 'D' WHERE USER_ID = ? AND PRJ_ID = ?";
        
   db.query(sql, [userId,req.query.id], function(error, result){
      if(error){
        throw error;
      }
     
     console.log(result);

      res.redirect( '/list');
     
   });  

});

router.post('/save', function(req, res, next){
 
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));
	
	const userId = req.session.user_id;
  
  //Insert  
  if(is.empty(post.prjId)){

    const insertProject = "INSERT INTO PROJECT_LIST ( PRJ_ID, USER_ID, PRJ_NM, PRJ_DESC ,CHAT_MODE, REC_STAT) VALUES (0, ?, ?, ? , ? , 'I')";
    db.query(insertProject, [ userId, post.prjNm, post.prjDesc, post.chatMode], function(error, result){
      if(error){
        throw error;
      }
      
      const prjId = result.insertId;
      
      addDefaultProfile(prjId, '선생님','left', 'icon_profile.jpg' ,1);
      addDefaultProfile(prjId,  '학생' ,'right', 'icon_profile.jpg' ,2);
      
      res.redirect( '/list');
    });  

  //Udate
  }else{
    const updateProject = "UPDATE PROJECT_LIST SET PRJ_NM = ? , PRJ_DESC = ? , CHAT_MODE = ? WHERE USER_ID = ? AND PRJ_ID = ?";
    db.query(updateProject, [ post.prjNm, post.prjDesc, post.chatMode, userId, post.prjId], function(error, result){
      if(error){
        throw error;
      }
        res.redirect( '/list');
    });  
  }  
  
});

router.post('/modify', function(req, res, next){
  
  const post = req.body;
	console.log("post --> "+JSON.stringify(post));
  
	const userId = req.session.user_id;
	
  const updateProject = "UPDATE PROJECT_LIST SET PRJ_NM = ? , PRJ_DESC = ? , CHAT_MODE = ? WHERE USER_ID = ? AND PRJ_ID = ?";
    db.query(updateProject, [ post.prjNm, post.prjDesc, post.chatMode, userId, post.prjId], function(error, result){
      if(error){
        throw error;
      }
        res.redirect( `/chatEdit/${post.prjId}`);
    });  
});


const addDefaultProfile = (prjId, profNm, position, filePath, sortSeq) => {
   const insertProf = "INSERT INTO PROF_LIST ( PROF_ID, PRJ_ID, PROF_NM, POSITION, FILE_PATH ,SORT_SEQ) VALUES (0, ?, ?, ?, ?, ?)";

      db.query(insertProf, [ prjId, profNm, position, filePath, sortSeq], function(error, result){
        if(error){
          throw error;
        }
        console.log(`[Insert E n d] 프로필 [${profNm}]이(가) 추가되었습니다`);
      });
}


module.exports = router;
