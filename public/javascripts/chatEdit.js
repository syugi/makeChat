const profImgs   = document.querySelectorAll('.profImg');
const modal      = document.querySelector('.projectModal');  
const profModal  = document.querySelector('.profileModal');  
const chatList   = document.querySelector('.chatList');  
	
let _prjInfo    = {};
let _profList   = [];
let _chats      = [];

let _activeProfId = "";

const openModal = () => {
  modal.classList.remove("hidden");
}

const closeModal = () => {
  modal.classList.add("hidden");
}

const openModalProf = () => {
	
	const saveChat = _chats.filter(function(chat){
    return chat.REC_STAT === 'I' || chat.REC_STAT === 'D';
  });
	
	if(saveChat.length > 0){
     alert("채팅저장 후 진행해주세요!");
     return false;
  }
  profModal.classList.remove("hidden");
}

const closeModalProf = () => {
  profModal.classList.add("hidden");
}

const settingData = (prjInfo,profData,chatData) => {
  
  _prjInfo = prjInfo;
  _profList = profData;
  _chats = chatData;
  // alert("_prjInfo :: "+ JSON.stringify(_prjInfo));
  // alert("_profList :: "+ JSON.stringify(_profList));
  // alert("_chats :: "+ JSON.stringify(_chats));
  
  _activeProfId = profData[0].PROF_ID;
  
	const mode = _prjInfo.CHAT_MODE;
	const radio  = document.querySelector(`input[name="chatMode"][value="${mode}"]`);  //채팅실행모드 (1:탭 , 2:스크롤, 3:플레이) 
	radio.checked = true; 
//document.querySelector('input[name="radioName"]:checked').value;
	
  chatData.forEach((data) => {
    addChat(data.CHAT_SEQ, data.CHAT_MSG, data.CHAT_TYPE, data.POSITION, data.PROF_ID);
  });
  
}

const selectProf = (div, profId) =>{
  const profDiv = div.closest('.profDiv');
  
  //다른선택 해제 
  profImgs.forEach((data) => {
    data.classList.remove("active");
  });
  
  div.classList.add("active");   
  
  _activeProfId   = profId;
}


function handleChatListClick(event){ 
  // const li = document.createElement("li");
  // const locaLine = document.createElement("span");
  // locaLine.innerText = "여기";
  // locaLine.classList.add("left","block");
  // li.appendChild(locaLine);
  // chatList.appendChild(li);
}

/**
 * 프로필 이미지파일 
 */
const handleProfFile = (e) => {
  // alert(e.target);

  const profImage  = document.querySelector('#profImage');

  const reader = new FileReader();
  
  const fileInput  = document.querySelector('#fileInputProf');
  const file       = fileInput.files[0];

  reader.onload = (e) => profImage.src = e.target.result;
  reader.readAsDataURL(file);
  
}


const handleBtnAddChat = (e) => {
	e.preventDefault();
	const input    = document.getElementById('chatInput'); 
  const chatMsg  = input.value;
  const profId   = _activeProfId;
  const position = getProfInfo(profId).POSITION;
  const chatSeq  = getChatSeq();
  const recStat  = "I"; 
  let chatType   = "Msg"; 
  
  if(chatMsg == "" || chatMsg == null){
    return;
  }
  
  //유튜브 형식인 경우
  if(chatMsg.indexOf("youtu.be") > -1){
     chatType = "Youtu";
  }
   
  const chatObj = {
     PRJ_ID    : _prjInfo.PRJ_ID
    ,PROF_ID   : profId
    ,CHAT_SEQ  : chatSeq
    ,CHAT_TYPE : chatType
    ,CHAT_MSG  : chatMsg
    ,POSITION  : position
    ,REC_STAT  : recStat
  }
  _chats.push(chatObj);
  
	addChat(chatSeq, chatMsg, chatType , position, profId);   // 메세지, 위치, 타입(msg:메세지, img:이미지, btn:버튼), 프로필 ID
  
	input.value = "";
}

/**
 * 이미지파일 
 */
const handleFileAddChat = () => {
   //alert(e.target);

	const chatMsg  = "Img";
	const profId   = _activeProfId;
	const position = getProfInfo(profId).POSITION;
	const chatSeq  = getChatSeq();
	const recStat  = "I"; 
	let chatType   = "Img"; 

	const chatObj = {
	PRJ_ID    : _prjInfo.PRJ_ID
	,PROF_ID   : profId
	,CHAT_SEQ  : chatSeq
	,CHAT_TYPE : chatType
	,CHAT_MSG  : chatMsg
	,POSITION  : position
	,REC_STAT  : recStat
	}
	_chats.push(chatObj);
  
	addChat(chatSeq, chatMsg, chatType , position, profId);   // 메세지, 위치, 타입(msg:메세지, img:이미지, btn:버튼), 프로필 ID
  
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
    
    if(chatInfo.REC_STAT === 'I'){
      
        const reader = new FileReader();

        elmt = document.createElement("img");
        const fileInput  = document.querySelector('#fileInput');
        const file       = fileInput.files[0];

        reader.addEventListener("load", function () {
          elmt.src = reader.result;
        }, false);

        if (file) {
          reader.readAsDataURL(file);
           
          fileInput.id = `${type}_${chatSeq}`;
          chatInfo.CHAT_MSG = file.name;
          
          const fileSaveList  = document.querySelector('#fileSaveList');
          var newFileInput  = document.createElement("input");  
          newFileInput.id     = "fileInput";
          newFileInput.type   = "file";
          newFileInput.name   = "img_file";
          newFileInput.accept = "image/*";
          newFileInput.addEventListener("change", handleFileAddChat,false);
            
          fileSaveList.appendChild(newFileInput);
        }
        
    }else {
        elmt = document.createElement("img");
        elmt.src = `../uploads/${msg}`;
    }
    
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
  
  const delBtn = document.createElement("div");
  delBtn.innerText  = "x";
  delBtn.onclick = () => { 

    chatList.removeChild(li);
   
    if(chatInfo.REC_STAT === 'I'){
      const cleanChats = _chats.filter(function(chat){
        return chat.CHAT_SEQ !== parseInt(li.id);
      });
      _chats = cleanChats;
    }else if(chatInfo.REC_STAT === 'N'){
      chatInfo.REC_STAT = 'D';
    }
  };

  delBtn.style.cursor = "pointer";
  delBtn.classList.add(position);
  delBtn.classList.add("text-gray-500","bg-white","rounded-full","hover:bg-gray-300","px-1");
  
  li.appendChild(delBtn);
  
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
 * 채팅 저장  
 */
const saveChatList = () => {

	const chatSaveForm   = document.chatSaveForm;
  const chatSaveList   = chatSaveForm.chatSaveList;
  const chatDeleteList = chatSaveForm.chatDeleteList;
	
  const saveChat = _chats.filter(function(chat){
    return chat.REC_STAT === 'I';
  });
  const deleteChat = _chats.filter(function(chat){
    return chat.REC_STAT === 'D';
  });
  
  chatSaveList.value   = JSON.stringify(saveChat);  
  chatDeleteList.value = JSON.stringify(deleteChat);  
  chatSaveForm.submit();
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
  
  const addChatForm   = document.querySelector('.addChatForm');  
  addChatForm.addEventListener("submit", handleBtnAddChat);
    
  chatList.addEventListener("click",handleChatListClick);
}


init();