
module.exports = {
	
  html : function(prjList){
		  return main(prjList)
           + projectModal();
  }
}

function main(prjList){
  
  let list = `<ul class="flex flex-col bg-gray-300 p-4 project_list">`;
  prjList.forEach((data)=>{
    list += `<li class="border-gray-400 flex flex-row mb-2" id=${data.PRJ_ID} >`;
    list += `<div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div class="hidden flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">${data.PRJ_ID}</div>
                <div class="flex-1 pl-1 mr-16 " onClick="location.href='/chatEdit/${data.PRJ_ID}'">
                  <div class="font-medium mb-2 prj_nm">${data.PRJ_NM}</div>
                  <div class="text-gray-600 text-sm prj_desc">${data.PRJ_DESC}</div>
										<div class="hidden text-gray-600 text-sm chat_mode">${data.CHAT_MODE}</div>
                </div>
									<div class="text-gray-600 text-xs px-4 py-3 mr-2 bg-gray-300" onclick="window.open('/chatRun/${data.PRJ_ID}?mode=${data.CHAT_MODE}')">공유</div>
									<div class="text-gray-600 text-xs px-4 py-3 mr-2 bg-gray-300" onclick="openModal(${data.PRJ_ID})">수정</div>
                <div class="text-gray-600 text-xs px-4 py-3 bg-gray-300" onclick="removeCheck(${data.PRJ_ID})">삭제</div>
                <!--<div class="text-gray-600 text-xs">6:00 AM</div>-->
            </div></li>`
    
  });
  list += "</ul>";
    
  return `
        <div class="wrap">
              <div class="px-4 py-6">
                <span class="text-lg">프로젝트 리스트</span>
                <button type="button" class="bg-blue-600 text-white hover:bg-blue-dark font-bold py-2 px-4 rounded m-3 cursor-pointer" onclick="openModal()">채팅 프로젝트 만들기 </button> 
                <div class="w-full md:w-2/3">
										${list}
									 <!-- ${prjList.size > 0 ? list : ''} -->
								</div>
              </div>
        </div>
      `;
}

function projectModal(){
    return `
    <div style=" background-color: rgba(0, 0, 0, 0.8)" class="projectModal fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full hidden">
			<div class="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
				<div class="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer" onClick="closeModal()">
					<svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
					</svg>
				</div>

				<div class="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
					
					<h2 class="font-bold text-2xl mb-6 text-gray-800 border-b pb-2" id="modalTitle">프로젝트 생성</h2>
				 
          <form method="POST" onsubmit="return validate();" action="/save">
              <input class="hidden" id="modalPrjId" name="prjId">
              <div class="mb-4">
                <label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">프로젝트 명</label>
                <input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" id="mopdalPrjNm" name="prjNm" onfocus = "this.select()">
              </div>

              <div class="mb-4">
                <label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">설명</label>
                <input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" id="modalPrjDesc" name="prjDesc">
              </div>

								<div class="mb-4">
											<label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">모드</label>
											<label class="inline-flex items-center">
												<input type="radio" class="form-radio" name="chatMode" value="1" checked>
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
