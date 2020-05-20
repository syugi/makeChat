
module.exports = {
	
     html : function(){
		return `
        <div class="wrap">
              <div class="px-4 py-6">
                <span class="text-lg">프로젝트 리스트</span>
                <button type="button" class="bg-blue-600 text-white hover:bg-blue-dark font-bold py-2 px-4 rounded m-3 cursor-pointer" onclick="createProject();">채팅 프로젝트 만들기 </button> 
                <ul class="projectList overflow-auto">
                </ul>
              </div>
        </div>
      `;
	 }
}
	