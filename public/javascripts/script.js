const modal         = document.querySelector('.projectModal');

function validate(){
  const prjNm         = document.getElementById('mopdalPrjNm');
  
  if(prjNm.value==""){
     alert("프로젝트 명을 입력해 주세요");
     prjNm.focus();
     return false;
  }
}

const openModal = (selectedPrjId) => {

  const title         = document.getElementById('modalTitle');
  const prjId         = document.getElementById('modalPrjId');
  const prjNm         = document.getElementById('mopdalPrjNm');
  const desc          = document.getElementById('modalPrjDesc');
 
  //수정
  if(selectedPrjId != null){
    
   const li         = document.getElementById(selectedPrjId);
    
    prjId.value     = selectedPrjId;
    prjNm.value     = li.querySelector('div.prj_nm').innerText;
    desc.value      = li.querySelector('div.prj_desc').innerText;
    title.innerHTML = "프로젝트 수정";
    
  //생성
  }else{

    prjId.value     = "";
    prjNm.value     = "NEW PROJECT";
    desc.value      = "";
    title.innerHTML = "프로젝트 생성";

  }
  
  modal.classList.remove("hidden");
}

const closeModal = () => {
  modal.classList.add("hidden");
}

function init(){
}


init();