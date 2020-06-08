const chatTypes  = document.querySelectorAll('.chatType');

const activeChatType = (e) => {
  
  const div = e.target;
  
  //다른선택 해제 
  chatTypes.forEach((data) => {
    if(div == data){
       div.classList.add("active");    
    }else{
      data.classList.remove("active");
    }
  });

  // alert("여기!!  "+e.target);
}

function init(){
  
  chatTypes.forEach((data) => {
    data.addEventListener("click", activeChatType);
  });
}


init();