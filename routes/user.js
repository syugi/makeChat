const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const user     = require('../views/user.js');	
const db       = require('../model/db_conn.js');
const is       = require('is-0');
const crypto   = require('crypto');

/* GET home page. */
router.get('/login', function(req, res, next) {
	
	const error = req.query.error;
	console.log("error --> "+error);
	
	let alert = ""; 
	if(error === 'id'){
		alert += `<script type="text/javascript">alert("존재하지 않는 ID입니다. 다시 확인해 주세요.");</script>`;
	}else if(error === 'pw'){
		alert += `<script type="text/javascript">alert("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");</script>`;
	}
	
	const title  = "Make Chat :: LOGIN";
	const link   = ``;
	const body  = `${user.login()}`;
	const script = ``+alert;
	const html   = template.HTML(title,link, body,script);
	
	res.send(html);
});

router.get('/signup', function(req, res, next){
 
	const error = req.query.error;
	console.log("error --> "+error);
	
	let alert = ""; 
	if(error === 'id'){
		alert += `<script src="/javascripts/user.js"></script> <script type="text/javascript">alert("가입된 이메일이 존재합니다.");</script>`;
	}
	
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));

  const title  = "Make Chat :: SIGN UP";
	const link   = ``;
	const body  = `${user.signUp()}`;
	const script = `<script src="/javascripts/user.js"></script>`+alert;
	const html   = template.HTML(title,link, body,script);
	res.send(html);
	
});


router.get('/logout', function(req, res, next){

	delete req.session.user_id;
  delete req.session.isLogined;

	req.session.save(function(){
			res.redirect('/user/login');
	});
	
});



router.post('/login', function(req, res, next){
 
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));

	const sql = "SELECT USER_ID , PASSWORD FROM USER A WHERE USER_ID = ?";
        
  db.query(sql, [post.id], function(error, result){
		
		if(error){
			throw error;
		}
		
		console.log(result);
		
		if(is.empty(result)){
        console.log("로그인 실패 - ID 없음!");
				res.redirect( '/user/login?error=id');
        return;
    }
         
    const password = result[0].PASSWORD;

			crypto.pbkdf2(post.password, 'salt', 1000, 64, 'sha512', (err, key) => {
				if (err) throw err;

				const cryptoPw = key.toString('base64');
				// console.log("password : "+password);
				// console.log("cryptoPw : "+cryptoPw);
				if(cryptoPw === password){
					console.log("로그인 성공!");
					req.session.user_id = result[0].USER_ID;     
					req.session.isLogined = true;

					req.session.save(function(){ 
						  //console.log("req.session ====> ",req.session);
							res.redirect( '/list');
					});
					
					return;
					
				}else{
					console.log("로그인 실패 - 비밀번호 불일치!");
					res.redirect( '/user/login?error=pw');
					return; 
				}
			}); 
  
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
			
			crypto.pbkdf2(post.password, 'salt', 1000, 64, 'sha512', (err, key) => {
     		if (err) throw err;
    
      	const cryptoPw = key.toString('base64');

				const insertUser = "INSERT INTO USER ( USER_ID, PASSWORD, REC_STAT) VALUES (?, ? , 'I')";
				db.query(insertUser, [ post.id, cryptoPw], function(error, result){
						if(error){
							throw error;
						}

						res.redirect( '/user/login');
				});  
    
    	});  
		}
		
	});

});

module.exports = router;
