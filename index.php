<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="./styles/main.css">
	<link rel="icon" type="image/png" href="./img/folder.png">
	<!-- <link rel="stylesheet" type="text/css" href="./index.style.css"> -->
	<!-- <link rel="stylesheet" type="text/css" href="./index.highlight.css"> -->
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
					<li><a id="settings-btn">Settings</a></li>
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
			 			<!-- <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICA8cGF0aCBmaWxsPSIjNTU1IiBkPSJNOSA0bC02IDYgNiA2IDEuNC0xLjRMNi44IDExSDE2VjlINi44bDMuNi0zLjZ6Ii8+Cjwvc3ZnPg==" alt="Move up" class="navbar-btn" id="move-up"> -->
			 			<svg viewBox="0 0 20 20" class="navbar-btn" id="move-up">
			 			  <path fill="#555" d="M9 4l-6 6 6 6 1.4-1.4L6.8 11H16V9H6.8l3.6-3.6z"/>
			 			</svg>
			 		</span>
			 		<span class="navbar-btn-wrapper">
			 			<svg viewBox="0 0 367.136 367.136" class="navbar-btn" id="refresh">
			 			<path d="M336.554,86.871c-11.975-18.584-27.145-34.707-44.706-47.731L330.801,0H217.436v113.91L270.4,60.691  c40.142,28.131,65.042,74.724,65.042,124.571c0,83.744-68.13,151.874-151.874,151.874S31.694,269.005,31.694,185.262  c0-58.641,32.781-111.009,85.551-136.669l-13.119-26.979C73.885,36.318,48.315,59.1,30.182,87.494  c-18.637,29.184-28.488,62.991-28.488,97.768c0,100.286,81.588,181.874,181.874,181.874s181.874-81.588,181.874-181.874  C365.442,150.223,355.453,116.201,336.554,86.871z"/>
			 			</svg>
			 		</span>
			 		<!-- <span class="navbar-btn-wrapper">
			 			<svg viewBox="0 0 1000 1000" class="navbar-btn" id="open-in-browser">
			 			<path d="M500,390.3l216.9,219.5H553.6v326.7H446.4V609.7H283L500,390.3z M880.2,63.6c30.6,0,56.6,11.1,77.9,33.2c21.3,22.1,31.9,47.6,31.9,76.5v653.3c0,28.9-11.1,54.4-33.2,76.6c-22.1,22.1-47.6,33.2-76.5,33.2H663.4V826.6h216.9V283H119.8v543.6h216.9v109.8H119.8c-30.6,0-56.6-11.1-77.9-33.2C20.6,881.1,10,855.6,10,826.6V173.3c0-28.9,10.6-54.4,31.9-76.5c21.3-22.1,47.2-33.2,77.9-33.2H880.2L880.2,63.6z"/>
			 			</svg>
			 		</span> -->
					<ul class="breadcrumb">
						<li class="mute">Loading...</li>
					</ul>
			 	</div>
				<ul class="items">
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

	<menu id="item-contextmenu" type="context">
		<menuitem label="Open in real" onclick="openFromDataHrefRecursive(event.fromElement)"></menuitem>
		<menu label="Copy" class="copy">
			<menuitem label="Name" onclick="copy(event.fromElement.nodeName == 'A' ? event.fromElement.parentNode : event.fromElement)"></menuitem>
			<menuitem label="Path"></menuitem>
		</menu>
	</menu>

	<script type="text/javascript" src="http://localhost/tests/jquery.js"></script>
	<script type="text/javascript" src="./highlight.js"></script>
	<script type="text/javascript" src="./js/functions.js"></script>
	<!-- <script type="text/javascript" src="./index.script.js"></script> -->
	<script type="text/javascript" src="./js/main.js"></script>
	<script type="text/javascript">
		
	</script>

</body>
</html>