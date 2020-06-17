module.exports = {
	
  html : function(prjData,profData,chatData){
		  return main(prjData,profData,chatData);
  }
}

function main(prjData,profData,chatData){
  //console.log("prjData여기여기 : ", prjData);
	// console.log(profData);
	// console.log(chatData);

  return `
        <div class="wrap bg-gray-300">
              <div class="px-4 py-6">
                <!--<p class="text-lg float-left">${prjData.PRJ_NM}</p>-->
                <!--<p class="">${prjData.PRJ_DESC}</p>-->
                <div class="w-full md:w-2/3" style="width:400px;">
                  <ul class="chatList bg-gray-100 overflow-auto" style="height:600px;">
                  </ul>
						<!--	<div class="chatInputForm flex flex-col clear-both bg-white">
                    <form class="addChatForm h-10"> 
                        <img src="../images/icon_photo.png" alt="" class="float-left w-1/12 px-1 cursor-pointer" onclick="document.getElementById('fileInput').click();""/>
												<input type="text" id="chatInput" class="border border-blue float-left w-9/12 h-full">
												<button class="float-left p-2 w-2/12" id="btnAddChat">등록</button>
									  	</form>
									</div> -->	
                </div>
              </div>
        </div>
      `;
}

