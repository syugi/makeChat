
function validate(){
   const email       = document.getElementById('email');
	 const pw          = document.getElementById('password');
	 const confirmPw   = document.getElementById('confirm_password');
	
  if(email.value==""){
     alert("Email을 입력해 주세요");
     email.focus();
     return false;
  }
	
	if(pw.value==""){
     alert("Password를 입력해 주세요");
     pw.focus();
     return false;
  }
	
	if(pw.value !== confirmPw.value){
     alert("비밀번호를 확인해주세요");
     confirmPw.focus();
     return false;
  }
}

// const removeCheck = (prjId) => {
// 	if (confirm("정말 삭제하시겠습니까??") == true){ 
// 		 location.href=`/delete?id=${	prjId}`;
// 	}else{   
// 	   return false;
// 	}
// }

function init(){
}


init();