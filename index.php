<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="./styles/main.css">
	<!-- <link rel="stylesheet" type="text/css" href="./styles/jquery.contextMenu.min.css"> -->
	<link rel="icon" type="image/png" href="./img/folder.png">
	<meta name="viewport" content="width=device-width" />
	<title>Localhost</title>
</head>
<body>
	<div class="wrapper">
		<header>
			<a href="/" class="brand">Localhost</a>
			<nav>
				<ul>
					<li><a href="/phpmyadmin/">phpmyadmin</a></li>
					<li class="nav-sep"></li>
					<li><a href="index.server.php">Server</a></li>
				</ul>
			</nav>
			<p class="search-wrapper">
				<input type="text" id="search" class="search" placeholder="Search in this directory..." autocomplete="off">
			</p>
		</header>
		<section class="main">
			<aside class="sidebar" id="sidebar">
				<h3>Projects</h3>
				<ul class="projects">
					<li>Loading...</li>
				</ul>
			</aside>
			<div class="sep" id="sep"></div>
			<article id="main">
			 	<div class="navbar">
			 		<span class="navbar-btn-wrapper">
			 		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.8 362" id="move-up">
						  <path fill="#ccc" d="M28.796 198.804l127.2-115.2v278.4h40v-278.4l124 115.2 28.8-30-172.8-168.8-176 166.8z"/>
						</svg>

			 		</span>
			 		<span class="navbar-btn-wrapper">
			 			<svg viewBox="0 0 367.136 367.136" class="navbar-btn" id="refresh">
			 				<path d="M336.554,86.871c-11.975-18.584-27.145-34.707-44.706-47.731L330.801,0H217.436v113.91L270.4,60.691  c40.142,28.131,65.042,74.724,65.042,124.571c0,83.744-68.13,151.874-151.874,151.874S31.694,269.005,31.694,185.262  c0-58.641,32.781-111.009,85.551-136.669l-13.119-26.979C73.885,36.318,48.315,59.1,30.182,87.494  c-18.637,29.184-28.488,62.991-28.488,97.768c0,100.286,81.588,181.874,181.874,181.874s181.874-81.588,181.874-181.874  C365.442,150.223,355.453,116.201,336.554,86.871z"/>
			 			</svg>
			 		</span>
			 		<span class="navbar-btn-wrapper">
			 			<svg viewBox="0 0 129 129" class="navbar-btn" id="edit-path">
			 				<g>
			 					<path d="m119.2,114.3h-109.4c-2.3,0-4.1,1.9-4.1,4.1s1.9,4.1 4.1,4.1h109.5c2.3,0 4.1-1.9 4.1-4.1s-1.9-4.1-4.2-4.1z"/>
			 					<path d="m5.7,78l-.1,19.5c0,1.1 0.4,2.2 1.2,3 0.8,0.8 1.8,1.2 2.9,1.2l19.4-.1c1.1,0 2.1-0.4 2.9-1.2l67-67c1.6-1.6 1.6-4.2 0-5.9l-19.2-19.4c-1.6-1.6-4.2-1.6-5.9-1.77636e-15l-13.4,13.5-53.6,53.5c-0.7,0.8-1.2,1.8-1.2,2.9zm71.2-61.1l13.5,13.5-7.6,7.6-13.5-13.5 7.6-7.6zm-62.9,62.9l49.4-49.4 13.5,13.5-49.4,49.3-13.6,.1 .1-13.5z"/>
			 				</g>
			 			</svg>
			 		</span>
					<ul class="breadcrumb">
						<li class="mute">Loading...</li>
					</ul>
			 	</div>
				<ul class="items" hiding-files=on>
					Loading...
				</ul>
			</article>
		</section>

		<div class="modal" id="settings" style="display: none;">
			<div class="modal-header">
				<h3>Settings</h3>
			</div>
			<div class="modal-body">
				
			</div>
			<div class="modal-footer">
				<button type="button">Close</button>
				<button type="button">Save</button>
			</div>
		</div>

	</div>
	
	<div class="credit" style="display: none;">
		<!--  -->
		<div>Icons made by <a href="http://www.flaticon.com/authors/lucy-g" title="Lucy G">Lucy G</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
		<!-- arrow -->
		<div>Icons made by <a href="http://www.flaticon.com/authors/vaadin" title="Vaadin">Vaadin</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
	</div>

	<!-- Jquery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script type="text/javascript" src="./js/functions.js"></script>
	
	<script type="text/javascript" src="./js/jquery.outside.js"></script>
	<script type="text/javascript" src="./js/jquery.ui.position.min.js"></script>
	<script type="text/javascript" src="./js/jquery.contextMenu.min.js"></script>
	
	
	<script type="text/javascript" src="./js/highlight.js"></script>
	<script type="text/javascript" src="./js/config.js"></script>
	<script type="text/javascript" src="./js/context-menu-functions.js"></script>
	<script type="text/javascript" src="./js/main.js"></script>

</body>
</html>