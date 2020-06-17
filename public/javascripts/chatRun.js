const chatList   = document.querySelector('.chatList');  

let _prjInfo    = {};
let _profList   = [];
let _chats      = [];

let timeId = "";

const settingData = (prjInfo,profData,chatData) => {
  
  _prjInfo = prjInfo;
  _profList = profData;
  _chats = chatData;
  // alert("_prjInfo :: "+ JSON.stringify(_prjInfo));
  // alert("_profList :: "+ JSON.stringify(_profList));
  // alert("_chats :: "+ JSON.stringify(_chats));
  
  const mode = _prjInfo.MODE; //채팅실행모드 (1:탭 , 2:스크롤, 3:플레이) 
  
  if(mode === '1'){
    chatList.addEventListener("click",handleChatListClick);
  }else if(mode === '2'){
    chatData.forEach((data) => {
      addChat(data.CHAT_SEQ, data.CHAT_MSG, data.CHAT_TYPE, data.POSITION, data.PROF_ID);
    });
  }else{
    timeId = setInterval(sendNextChat, 1000);
  }
  
}

const handleChatListClick = (e) => {
  sendNextChat();
}

/**
 * 다음 채팅 표시 
 */
function sendNextChat(){

  const chatObj = _chats.shift();
  
  if(chatObj != '' && chatObj != null){
    addChat(chatObj.CHAT_SEQ, chatObj.CHAT_MSG, chatObj.CHAT_TYPE, chatObj.POSITION, chatObj.PROF_ID);
  }
}

/**
 * 채팅 표시  
 *
 * @param msg        : 메세지 내용
 * @param type       : 타입(버튼-Btn, 이미지-Img, 유튜브-Youtu, 메세지-Msg)
 * @param position   : 위치(left,right)
 * @param profId     : 프로필 ID
 */
const addChat = (chatSeq, msg, type, position, profId) => {
  
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
  
  const chatInfo = getChatInfo(chatSeq);
  
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
    elmt.src = `../uploads/${msg}`;
    
    elmt.classList.add(type);
    elmt.classList.add(position);
    
  //유튜브 링크 
  }else if(type == "Youtu"){

    //유튜브 형식이 아닌경우 메세지 처리 
    if(msg.indexOf("youtu.be") < 0){
      addChat(chatSeq, msg,"Msg",position,profId);
      return;
    }
    
    //유튜브 ID 분리 
    const msgSplit = msg.split("/");
    const youtuId  = msgSplit[msgSplit.length-1];  //유튜브 링크 예시) https://youtu.be/CI0oF5RovCs 
    
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
  
  li.id    = chatSeq;        //리스트 ID
  li.value = profId;        //프로필 ID
  li.appendChild(elmt);
  
  chatList.appendChild(li);

  //스크롤 맨 밑으로 
  chatList.scrollTop = chatList.scrollHeight;

}



/**
 * 프로필 표시  
 */
const setProfile = (profId) =>  {
    
    const profInfo    = getProfInfo(profId);
    const imgPath     = profInfo.FILE_PATH;
    const profName    = profInfo.PROF_NM;
    const position    = profInfo.POSITION;
    
    //프로필 추가 
    const li = document.createElement("li");
    
    const img = document.createElement("img");
    img.src = "../uploads/"+imgPath;
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


/**
 * 프로필 정보  
 */
const getProfInfo = (profId) => {
  
  let profInfo = _profList.filter(function(prof){
    return prof.PROF_ID === parseInt(profId);
  });
  
  return profInfo[0]; 
}

/**
 * 채팅 정보  
 */
const getChatInfo = (chatSeq) => {
  
  let chatInfo = _chats.filter(function(chat){
    return chat.CHAT_SEQ === parseInt(chatSeq);
  });
  
  return chatInfo[0]; 
}

/**
 * 채팅 순번
 */
const getChatSeq  = () => {
 
  if(_chats.length === 0){
    return 1;
    
  }else{
    const lastSeq = _chats[_chats.length-1].CHAT_SEQ;
    if(lastSeq == null){
      return 1;
    }
    return lastSeq+1;
  }
}

function init(){
  
}


init();