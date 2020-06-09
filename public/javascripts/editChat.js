const profImgs   = document.querySelectorAll('.profImg');
const modal      = document.querySelector('.projectModal');  
const chatList   = document.querySelector('.chatList');  
    
const openModal = () => {
  modal.classList.remove("hidden");
}

const closeModal = () => {
  modal.classList.add("hidden");
}

const selectProfImg = (e) => {
  
  const div = e.target;
  
  //alert("여기!!  "+JSON.stringify(profImgs));
  
  //다른선택 해제 
  profImgs.forEach((data) => {
    data.classList.remove("active");
  });

  div.classList.add("active");   
  
  // alert("여기!!  "+e.target);
}

const handleBtnAddChat = (e) => {
	e.preventDefault();
	const input      = document.getElementById('chatInput'); 
	//alert("여기!!"+input.value);
  
  const chatMsg  = input.value;
  let chatType = "Msg";  //테스트 하드코딩 
  let position = "left"; //테스트 하드코딩 
  let profId   = "1";     //테스트 하드코딩 
     
  //유튜브 형식인 경우
  if(chatMsg.indexOf("youtu.be") > -1){
     chatType = "Youtu";
  }
  
	addChat(chatMsg, chatType , position, profId);   // 메세지, 위치, 타입(msg:메세지, img:이미지, btn:버튼), 프로필 ID
  
	input.value = "";
}

/**
 * 채팅 추가 
 *
 * @param msg        : 메세지 내용
 * @param position   : 위치(left,right)
 * @param type       : 타입(버튼-B, 이미지-I, 유튜브-Y, 메세지-T)
 * @param profId     : 프로필 ID
 */
function addChat(msg,type,position, profId){
  
  if(msg == "" || msg == null){
    return;
  }
  
  //profId가 전에 보낸 채팅 id랑 같지 않으면 프로필 전송하기 
  const liList = document.querySelectorAll(".chatList li");
  if(liList.length == 0){
    setProfile(profId);
  }else{
    const prevProfId = liList[liList.length-1].value;
    if(prevProfId == null || profId != prevProfId){ 
      setProfile(profId);
    }
  }
  
  
  const li = document.createElement("li");

  var elmt;
  
  //버튼
  if(type == "Btn"){
    elmt = document.createElement("button");
    elmt.addEventListener("click",handleChatButtonClick);

    elmt.classList.add(type);
    elmt.classList.add(position);
    
  //이미지
  }else if(type == "Img"){
    
    elmt = document.createElement("img");
    elmt.src = msg;
    // elmt.width = "300";
    // elmt.height = "200";

    elmt.classList.add(type);
    elmt.classList.add(position);
    
  //유튜브 링크 
  }else if(type == "Youtu"){

    sendMsg(msg,position,"Msg",profId);
    
    //유튜브 형식이 아닌경우 메세지 처리 
    if(msg.indexOf("youtu.be") < 0){
      return;
    }
    
    //유튜브 ID 분리 
    const msgSplit = msg.split("/");
    const youtuId  = msgSplit[3];  //유튜브 링크 예시) https://youtu.be/CI0oF5RovCs 
    console.log("유튜브 ID:"+youtuId);
    
    elmt = document.createElement("img");
    elmt.src = "https://img.youtube.com/vi/"+youtuId+"/0.jpg";
    elmt.onclick = () => { window.open(msg);};
    elmt.style.cursor = "pointer";
    // elmt.width = "300";
    // elmt.height = "200";
    
    elmt.classList.add(type);
    elmt.classList.add(position);
   
  //메세지 
  }else{
    
    //링크가 있는경우 하이퍼링크
    if(msg.indexOf("http")>-1){
      
      elmt = document.createElement("a");
      elmt.textContent = msg;
      elmt.href = msg;
      elmt.style.color = "blue";
      elmt.style.textDecoration='underline';
      
    //일반 채팅 메세지 
    }else{
      
      elmt = document.createElement("span");
      elmt.innerText = msg;
    }
    
    elmt.classList.add(position+type);
    
  }
  
  elmt.classList.add("chatMsg")+1; //채팅 여백 
  
  console.log(profId);
  //li.id    = chats.length;  //리스트 ID
  li.value = profId;        //프로필 ID
  li.appendChild(elmt);
    
  chatList.appendChild(li);

  //스크롤 맨 밑으로 
  //chatList.scrollTop = chatList.scrollHeight;

}

/**
 * 프로필 표시 
 *
 * @param profId   : 프로필 ID 
 * 
 */
function setProfile(profId){

    //프로필 정보 조회 
    // const profInfo = getProfInfo(profId);

    // if(profInfo == null){
    //   return;
    // }

    // const imgPath     = profInfo.imgPath;  //프로필 이미지 경로
    // const profName    = profInfo.profName; //프로필 이름 
    // const position    = profInfo.position; //위치(left,right)
    
    //테스트 하드코딩 
    const imgPath     = 'https://randomuser.me/api/portraits/women/12.jpg';
    const profName    = '선생님';
    const position    = 'left';
    
    //프로필 추가 
    const li = document.createElement("li");
    
    const img = document.createElement("img");
    img.src = imgPath;
    img.classList.add("profileImg");

    const span = document.createElement("span");
    span.innerText = profName;
    span.classList.add("profileName");
    
   
    if(position == "right"){
      li.appendChild(span);
      li.appendChild(img);
      
    }else{
      li.appendChild(img);
      li.appendChild(span);
    }  
    
    li.classList.add("profile");
    li.classList.add(position);
    
    chatList.appendChild(li);
    
}

function init(){
  
  profImgs.forEach((data) => {
    data.addEventListener("click", selectProfImg);
  });
	
	const btn      = document.getElementById('btnAddchat');
	btn.addEventListener("click", handleBtnAddChat);
}


init();