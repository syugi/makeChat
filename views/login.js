module.exports = {
	
  html : function(){
		  return login();
  },
	signUp : function(){
		  return signUp();
  }
}


function login(){
  return `
<div class="login_section bg-gray-200 min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">LOGIN</h1>
                    <form class="" method="POST" action="/login" >
												<input 
														type="text"
														class="block border border-gray-300 w-full p-3 rounded mb-4"
														name="id"
														placeholder="EMAIL" />

												<input 
														type="password"
														class="block border border-gray-300 w-full p-3 rounded mb-4"
														name="password"
														placeholder="Password" />
												
												<button type="submit"  class="w-full bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded focus:outline-none focus:shadow-outline" name="submit">로그인</button>
											</form>
                </div>

                <div class="text-grey-dark mt-6">
									<a class="no-underline border-b border-blue-700 text-blue-700" href="/signup">회원가입</a>
                </div>
            </div>
        </div>
        `;
}



function signUp(){
  return `
     <div class="bg-gray-200 min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <form class="" method="POST" onsubmit="return validate();" action="/saveUser" >
											<input 
													type="text"
													class="block border border-grey-light w-full p-3 rounded mb-4"
													name="id" id="email"
													placeholder="EMAIL" />

											<input 
													type="password"
													class="block border border-grey-light w-full p-3 rounded mb-4"
													name="password" id="password"
													placeholder="Password" />
											<input 
													type="password"
													class="block border border-grey-light w-full p-3 rounded mb-4"
													name="confirm_password" id = "confirm_password"
													placeholder="Confirm Password" />

											<button type="submit"  class="w-full bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded focus:outline-none focus:shadow-outline" name="submit">회원가입</button>

										 <!-- <div class="text-center text-sm text-grey-dark mt-4">
													By signing up, you agree to the 
													<a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
															Terms of Service
													</a> and 
													<a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
															Privacy Policy
													</a>
											</div>--> 
										</form>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue-700 text-blue-700" href="/login">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
        `;
}
