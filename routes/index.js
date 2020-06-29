const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const index    = require('../views/index.js');		
const login    = require('../views/login.js');	
const db       = require('../model/db_conn.js');
const is       = require('is-0');

/* GET home page. */
router.get('/', function(req, res, next) {
  
	res.redirect( '/login');
	
});

router.get('/login', function(req, res, next) {
	
	const title  = "Make Chat :: LOGIN";
	const link   = ``;
	const body  = `${login.html()}`;
	const script = ``;
	const html   = template.HTML(title,link, body,script);
	res.send(html);

});

router.get('/signup', function(req, res, next){
 
	const error = req.query.error;
	console.log("error --> "+error);
	
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));

  const title  = "Make Chat :: SIGN UP";
	const link   = ``;
	const body  = `${login.signUp()}`;
	const script = `<script src="/javascripts/login.js"></script>`;
	const html   = template.HTML(title,link, body,script);
	res.send(html);
	
});

router.post('/login', function(req, res, next){
 
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));

	const sql = "SELECT USER_ID FROM USER A WHERE USER_ID = ?";
        
  db.query(sql, [post.id], function(error, result){
	if(error){
		throw error;
	}
		
  	res.redirect( '/list');
	});
	
});

router.post('/saveUser', function(req, res, next){
 
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));

	const sql = "SELECT USER_ID FROM USER A WHERE USER_ID = ?";
        
  db.query(sql, [post.id], function(error, result){
	if(error){
		throw error;
	}
		 
		if(!is.empty(result)){
				res.redirect( '/signup?error=id');
			
		}else{
		
			const insertUser = "INSERT INTO USER ( USER_ID, PASSWORD, REC_STAT) VALUES (?, ? , 'I')";
			db.query(insertUser, [ post.id, post.password], function(error, result){
					if(error){
						throw error;
					}
				
					res.redirect( '/login');
			});  
			
		}
		
	});

});


router.get('/list', function(req, res, next) {
  
  const sql = "SELECT PRJ_ID, PRJ_NM, PRJ_DESC , CHAT_MODE FROM PROJECT_LIST A WHERE REC_STAT <> 'D' ORDER BY PRJ_ID";
        
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
  
   //const sql = "DELETE FROM PROJECT_LIST WHERE PRJ_ID = ?";
  const sql = "UPDATE PROJECT_LIST SET REC_STAT = 'D' WHERE PRJ_ID = ?";
        
   db.query(sql, [req.query.id], function(error, result){
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
	
  
  //Insert  
  if(is.empty(post.prjId)){

    const insertProject = "INSERT INTO PROJECT_LIST ( PRJ_ID, PRJ_NM, PRJ_DESC ,CHAT_MODE, REC_STAT) VALUES (0, ?, ? , ? , 'I')";
    db.query(insertProject, [ post.prjNm, post.prjDesc, post.chatMode], function(error, result){
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
    const updateProject = "UPDATE PROJECT_LIST SET PRJ_NM = ? , PRJ_DESC = ? , CHAT_MODE = ? WHERE PRJ_ID = ?";
    db.query(updateProject, [ post.prjNm, post.prjDesc, post.chatMode, post.prjId], function(error, result){
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
  
  const updateProject = "UPDATE PROJECT_LIST SET PRJ_NM = ? , PRJ_DESC = ? , CHAT_MODE = ? WHERE PRJ_ID = ?";
    db.query(updateProject, [ post.prjNm, post.prjDesc, post.chatMode, post.prjId], function(error, result){
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
