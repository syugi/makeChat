const modal         = document.getElementById('projectModal');
const projectList   = document.querySelector('project_list');

function validate(){
  var prjNm        = document.getElementById('prjNm');
  
  if(prjNm.value==""){
     alert("프로젝트 명을 입력해 주세요");
     prjNm.focus();
     return false;
  }
}

const openModal = () => {
  modal.classList.remove("hidden");
}

const closeModal = () => {
  modal.classList.add("hidden");
}

const handleModifyProject = (e) =>{
  const btn = e.target;
 // alert(btn.id); 
  
 //  console.log(event.target);
  // const prjNm   = document.getElementById('prjNm');
  // prjNm.value = "aaa";
  //openModal();
}

const handleDeleteProject = (e) =>{
  const btn = e.target;
  const li  = btn.parentNode;
  alert(li.id); 
  //projectList.removeChild(e.target.parentElement)
}

function init(){
  
  //프로젝트 수정 
  let btnModifys = document.querySelectorAll('.btn_modify_prj');

	btnModifys.forEach((node, index) => {
    node.addEventListener("click", handleModifyProject);
	});
  
  //프로젝트 삭제
  let btnDeletes = document.querySelectorAll('.btn_delete_prj');

	btnDeletes.forEach((node, index) => {
    node.addEventListener("click", handleDeleteProject);
	});
  
}


init();