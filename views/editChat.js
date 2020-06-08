
module.exports = {
	
  html : function(data){
		  return main(data)
           + modal();
  }
}

function main(data){
  
  const chatTypeList = [
     {type : 'img'    , name : '이미지'    , imgPath : "https://randomuser.me/api/portraits/women/12.jpg"}
    ,{type : 'youtube', name : '유튜브링크' , imgPath : "https://randomuser.me/api/portraits/women/12.jpg"}
    ,{type : 'profile', name : '선생님'    , imgPath : "https://randomuser.me/api/portraits/women/12.jpg"}
    ,{type : 'profile', name : '학생'      , imgPath : "https://randomuser.me/api/portraits/women/12.jpg"}
  ];
  
  //    		<!-- <div class="p-1 border-4 border-blue-600 rounded-full"> -->
  let chatTypes = "";
  chatTypeList.forEach((data)=>{
    chatTypes += `<div class="text-sm text-center mx-2">`;
		chatTypes += `	<div class="chatType">				`;
		chatTypes += `			<div class="w-12 h-12 relative flex flex-shrink-0"> `;
    chatTypes += `       <img class="shadow-md rounded-full w-full h-full object-cover" src=${data.imgPath} alt=""> `;
		chatTypes += `			</div></div><p class="pt-2">${data.name}</p></div>`;
  });
    

  
    
  return `
        <div class="wrap bg-gray-300">
              <div class="px-4 py-6">
                <p class="text-lg mb-2">${data.PRJ_NM}</p>
                <p class="">${data.PRJ_DESC}</p>
                <div class="w-full md:w-2/3" style="width:400px;">
                  <ul class="chatList bg-gray-100 overflow-auto" style="height:600px;">
                  </ul>
									<form class="chatInputForm flex flex-col clear-both bg-white">
										<div class="chatTypeList flex flex-row p-2 overflow-auto w-0 min-w-full">
											${chatTypes}   
                      <button class="flex flex-shrink-0 focus:outline-none block text-gray-500 w-8 mx-2" type="button">
                        <svg class="w-full h-full fill-current" viewBox="0 0 24 24">
                           <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"></path>
                        </svg>
                      </button>
                    </div>  
                    <div class="h-10">
											<!-- <img src="http://placehold.it/16x16" alt="" class="float-left w-1/12"/> -->
											<input type="text" class="border border-blue float-left w-10/12 h-full">
											<button class="float-left p-2 w-2/12">보내기</button>
										</div>
									</form>
                </div>
              </div>
        </div>
      `;
}

function modal(){
    return `
    <div id="projectModal" style=" background-color: rgba(0, 0, 0, 0.8)" class="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full hidden">
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
                <input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" id="mopdalPrjNm" name="prjNm">
              </div>

              <div class="mb-4">
                <label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">설명</label>
                <input class="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" id="modalPrjDesc" name="prjDesc">
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
