exports.HTML = function(title, link, body , script){  
	  return ` 
	  <!doctype html>
	  <html>
	  <head> 
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" href="/stylesheets/style.css">

    <link rel="stylesheet" href="/build/tailwind.css">

		<title>${title}</title>
 
		${link}

		<!--tailwind-->
		<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">

	  </head>
	  <body>
		<div id="wrap">
			<header class="header">
        <!-- <h1 class="logo">
				  <a href="/">MAKE CHAT</a>
		  	</h1> -->
			</header>

			${body}

			<footer class="footer">
        	<!-- <div class="py-5 mx-10 text-gray-300 text-xs">
            <div class="pb-3 text-sm">MAKE CHAT</div>
            <div class="pb-2">개발자 : msHeo </div>
            <div class="pb-4"></div>
            <div >copyright&copy;Make Chat all rights reserved.</div>
          </div>  -->
			</footer>
		</div>
	  </body>
	  </html>
   
		${script}
	  `;
  
  }
	