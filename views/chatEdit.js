module.exports = {
	
  html : function(prjData,profData,chatData){
		  return main(prjData,profData,chatData)
           + modal(prjData);
  }
}

function main(prjData,profData,chatData){
  //console.log("prjData여기여기 : ", prjData);
	// console.log(profData);
	// console.log(chatData);
  
  let list_prof = "";
  profData.forEach((data, i)=>{
    const active = i==0?'active':'';
    list_prof += `<div class="text-sm text-center mx-2">`;
		list_prof += `			<div class="profDiv w-12 h-12 relative flex flex-shrink-0">`;
    list_prof += `      <img class="profImg shadow-md rounded-full w-full h-full object-cover ${active}" src="../uploads/${data.FILE_PATH}" alt="" onclick="selectProf( this,'${data.PROF_ID}')">`;
		list_prof += `			</div>`;
    list_prof += `			<p class="pt-2">${data.PROF_NM}</p>`;
    list_prof += `</div>`;
  });  
  
  return `
        <div class="wrap bg-gray-300">
              <button type="button" class="bg-gray-800 text-white hover:bg-blue-dark font-bold py-2 px-4 rounded cursor-pointer" onclick="location.href='/'">돌아가기</button>
              <button type="button" class="bg-gray-800 text-white hover:bg-blue-dark font-bold py-2 px-4 rounded cursor-pointer" onclick="window.open('/chatRun/${prjData.PRJ_ID}?mode=${prjData.CHAT_MODE}')">미리보기</button>
              <div class="px-4 py-6">
                <p class="text-lg float-left">${prjData.PRJ_NM}</p>
                <button type="button" class="bg-blue-400 text-white hover:bg-blue-dark font-bold py-2 px-4 rounded cursor-pointer" onclick="openModal()">프로젝트수정</button>
                <p class="">${prjData.PRJ_DESC}</p>
                <div class="w-full md:w-2/3" style="width:400px;">
                  <ul class="chatList bg-gray-100 overflow-auto" style="height:600px;">
                  </ul>
									<div class="chatInputForm flex flex-col clear-both bg-white">
										<div class="profList flex flex-row p-2 overflow-auto w-0 min-w-full">
											${list_prof}   
                      <button class="flex flex-shrink-0 focus:outline-none block text-gray-500 w-8 mx-2" type="button">
                        <svg class="w-full h-full fill-current" viewBox="0 0 24 24">
                           <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"></path>
                        </svg>
                      </button>
                    </div>  
                    <form class="addChatForm h-10"> 
                        <img src="../images/icon_photo.png" alt="" class="float-left w-1/12 px-1 cursor-pointer" onclick="document.getElementById('fileInput').click();""/>
												<input type="text" id="chatInput" class="border border-blue float-left w-9/12 h-full">
												<button class="float-left p-2 w-2/12" id="btnAddChat">등록</button>
									  	</form>
										<button onclick="saveChatList()" class="float-right bg-blue-400 text-white hover:bg-blue-dark font-bold py-2 px-4 m-3 rounded cursor-pointer">채팅저장</button>
									</div>	
                  <form name="chatSaveForm" method="POST" action="/chatEdit/save" enctype="multipart/form-data">
                    <input class="hidden" name="prjId" value="${prjData.PRJ_ID}">
                    <input class="hidden" name="chatSaveList" type="text" value="">
                    <input class="hidden" name="chatDeleteList" type="text" value="">
                    <div id="fileSaveList" name="fileSaveList" class="hidden">
                      <input class="" id="fileInput" type="file" name="img_file" accept="image/*" onchange="handleFileAddChat(event);">   
                    </div>
                  </form>	
                </div>
              </div>
        </div>
      `;
}

function modal(prjData){
    return `
    <div style=" background-color: rgba(0, 0, 0, 0.8)" class="projectModal fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full hidden">
			<div class="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
				<div class="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer" onclick="closeModal()">
					<svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
					</svg>
				</div>

				<div class="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
					
					<h2 class="font-bold text-2xl mb-6 text-gray-800 border-b pb-2" id="modalTitle">프로젝트 수정</h2>
				 
          <form method="POST" onsubmit="return validate();" action="/modify">
              <input class="hidden" id="modalPrjId" name="prjId" value="${prjData.PRJ_ID}">
              <div class="mb-4">
                <label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">프로젝트 명</label>
                <input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" id="mopdalPrjNm" name="prjNm" value="${prjData.PRJ_NM}" onfocus = "this.select()">
              </div>

              <div class="mb-4">
                <label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">설명</label>
                <input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" id="modalPrjDesc" name="prjDesc" value="${prjData.PRJ_DESC}">
              </div>

								<div class="mb-4">
											<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">모드</label>
											<label class="inline-flex items-center">
												<input type="radio" class="form-radio" name="chatMode" value="1">
												<span class="ml-2">탭</span>
											</label>
											<label class="inline-flex items-center ml-6">
												<input type="radio" class="form-radio" name="chatMode" value="2">
												<span class="ml-2">스크롤</span>
											</label>
											<label class="inline-flex items-center ml-6">
												<input type="radio" class="form-radio" name="chatMode" value="3">
												<span class="ml-2">플레이</span>
											</label>
							  </div>

              <div class="mt-8 text-right">
                <button type="button" class="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm mr-2" onClick="closeModal()" type="button" >
                  Cancel
                </button>	
                <button type="submit" class="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow-sm" id="btnAddProject" name="submit">
                  Save
                </button>	
              </div>
          </form>
        </div>
			</div>
		</div>
    `
  
}
