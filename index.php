<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="./styles/main.css">
	<link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="icon" type="image/png" href="./img/folder.png">
	<meta name="viewport" content="width=device-width" />
	<title class="insert-localhost" data-capitalize=on>Localhost</title>
</head>
<body>

	<div class="wrapper">
		<header>
			<a href="/" class="brand insert-localhost" data-capitalize=on>Localhost</a>
			<nav>
				<ul>
					<li><a href="/phpmyadmin/">phpmyadmin</a></li>
				</ul>
			</nav>
			<p class="pull-right">
				<input type="text" id="search" class="search" placeholder="Search in this directory..." autocomplete="off">
				<a href="https://github.com/math2001/nlfb" title="View on github" target="_blank">
					<svg viewbox="0 0 1024 1024" class="githubicon" xmlns="http://www.w3.org/2000/svg">
						<path d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-.47-52.562-.72-95.312C242 908.812 211.907 817.5 211.907 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.53-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375-113.656-12.937-233.218-56.875-233.218-253.063 0-55.938 19.97-101.562 52.656-137.406-5.22-13-22.843-65.094 5.063-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.03 128.125-17.22 43.5.19 87.31 5.876 128.187 17.282 97.688-66.312 140.688-52.5 140.688-52.5 28 70.53 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.47 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-.688 123.625-.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z"/>
					</svg>
				</a>
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
				<div class="path-edit-panel" id="path-edit-panel" style="display: none;">
					<input type="text">
				</div>
			 	<div class="navbar">
			 		<span class="navbar-btn-wrapper">
			 			<svg class="navbar-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.8 362" id="dirname" data-toggle="tooltip" data-placement="bottom" title="Dirname">
			 				<path fill="#ccc" d="M28.796 198.804l127.2-115.2v278.4h40v-278.4l124 115.2 28.8-30-172.8-168.8-176 166.8z"/>
			 			</svg>
			 		</span>
			 		<span class="navbar-btn-wrapper">
			 			<svg viewBox="0 0 367.136 367.136" class="navbar-btn" id="refresh"  data-toggle="tooltip" data-placement="bottom" title="Refresh">
			 				<path d="M336.554,86.871c-11.975-18.584-27.145-34.707-44.706-47.731L330.801,0H217.436v113.91L270.4,60.691  c40.142,28.131,65.042,74.724,65.042,124.571c0,83.744-68.13,151.874-151.874,151.874S31.694,269.005,31.694,185.262  c0-58.641,32.781-111.009,85.551-136.669l-13.119-26.979C73.885,36.318,48.315,59.1,30.182,87.494  c-18.637,29.184-28.488,62.991-28.488,97.768c0,100.286,81.588,181.874,181.874,181.874s181.874-81.588,181.874-181.874  C365.442,150.223,355.453,116.201,336.554,86.871z"/>
			 			</svg>
			 		</span>
			 		<span class="navbar-btn-wrapper">
			 			<svg viewBox="0 0 129 129" class="navbar-btn" id="edit-path" data-toggle="tooltip" data-placement="bottom" title="Edit path">
			 				<g>
			 					<path d="m119.2,114.3h-109.4c-2.3,0-4.1,1.9-4.1,4.1s1.9,4.1 4.1,4.1h109.5c2.3,0 4.1-1.9 4.1-4.1s-1.9-4.1-4.2-4.1z"/>
			 					<path d="m5.7,78l-.1,19.5c0,1.1 0.4,2.2 1.2,3 0.8,0.8 1.8,1.2 2.9,1.2l19.4-.1c1.1,0 2.1-0.4 2.9-1.2l67-67c1.6-1.6 1.6-4.2 0-5.9l-19.2-19.4c-1.6-1.6-4.2-1.6-5.9-1.77636e-15l-13.4,13.5-53.6,53.5c-0.7,0.8-1.2,1.8-1.2,2.9zm71.2-61.1l13.5,13.5-7.6,7.6-13.5-13.5 7.6-7.6zm-62.9,62.9l49.4-49.4 13.5,13.5-49.4,49.3-13.6,.1 .1-13.5z"/>
			 				</g>
			 			</svg>
			 		</span>
					<ul class="breadcrumb" id="breadcrumbs">
						<li class="mute">Loading...</li>
					</ul>
			 	</div>
		 		<div class="items" hiding-files=on view-mode=icon data-zoom="3" data-zoom-min=0 data-zoom-max=6>

		 		</div>
				</ul>
			</article>
		</section>

		<div class="mfade" style="display: none;">
			<div class="modal" id="simple-message">
				<div class="mheader">
					<h3></h3>
				</div>
				<div class="mbody">
				</div>
				<div class="mfooter">
					<button type="button" class="close">OK</button>
				</div>
			</div>
		</div>

	</div>

	<div class="credit" style="display: none;">
		<!--  -->
		<div>Icons made by <a href="http://www.flaticon.com/authors/lucy-g" title="Lucy G">Lucy G</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
		<!-- arrow -->
		<div>Icons made by <a href="http://www.flaticon.com/authors/vaadin" title="Vaadin">Vaadin</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
	</div>

	<!-- Template for mustache -->
	<script type="text/template" id="items-template-faf">
		{{ #folders }}
			<li class="item {{ #isHidden }}item-hide{{ /isHidden }}" data-href="{{ path }}">
				<img src="{{ icon }}"> <a>{{{ name }}}</a>
			</li>
		{{ /folders }}
		{{ #files }}
			<li class="item {{ #isHidden }}item-hide{{ /isHidden }}" data-href="{{ path }}">
				<img src="{{ icon }}"> <a>{{{ name }}}</a>
			</li>
		{{ /files }}
	</script>
	<script type="text/template" id="items-template-code">
		<pre class="hljs"><code>{{{ code }}}</code><div class="language">{{ language }}</div></pre>
	</script>
	<script type="text/template" id="items-template-image">
		<img src="{{ path }}" class="atomic-center">
	</script>
	<script type="text/template" id="breadcrumbs-template">
		{{ #splitedPath }}
			<li><a data-href="{{ path }}">{{ name }}</a></li>
		{{ /splitedPath }}
	</script>

	<script type="text/template" id="sidebar-template">
		<ul>
			{{ #folders }}
				<li>
					{{ #hasFolder }}
					<span class="spoiler-button" deployed="off"></span>
					{{ /hasFolder }}
					{{ ^hasFolder }}
					<span class="spoiler-replace"></span>
					{{ /hasFolder }}
					<a data-href="{{ path }}">{{ name }}</a>
				</li>
			{{ /folders }}
		</ul>
	</script>


	<!-- Jquery -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.js"></script>

	<script type="text/javascript" src="./js/jquery.outside.js"></script>
	<script type="text/javascript" src="./js/jquery.ui.position.min.js"></script>
	<script type="text/javascript" src="./js/jquery.contextMenu.min.js"></script>

	<script type="text/javascript" src="./js/bootstrap-tooltip.js"></script>


	<!-- highlightjs -->
	<script type="text/javascript" src="./js/highlight.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/languages/stylus.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/languages/yaml.min.js"></script>


	<script type="text/javascript" src="./js/prototypes-updater.js"></script>

	<script type="text/javascript" src="./js/event-manager.js"></script>
	<script type="text/javascript" src="./js/hash.js"></script>
	<script type="text/javascript" src="./js/breadcrumbs.js"></script>
	<script type="text/javascript" src="./js/tools.js"></script>
	<script type="text/javascript" src="./js/path.js"></script>
	<script type="text/javascript" src="./js/items.js"></script>
	<script type="text/javascript" src="./js/search.js"></script>
	<script type="text/javascript" src="./js/sidebar.js"></script>
	<script type="text/javascript" src="./js/shorcuts.js"></script>


	<script type="text/javascript">
		function main () {

			$(".insert-localhost").text(function () {
				var capitalize = $(this).attr('data-capitalize') == 'on'
				$(this).removeClass('insert-localhost').removeAttr('data-capitalize')
				return capitalize ? CONFIG.localhost.capitalize() : CONFIG.localhost
			})

			Hash.init(EM);
			Path.init(EM);
			Tools.init(EM, Path)
			Breadcrumbs.init(EM, Path)
			Search.init(EM, Path)
			Sidebar.init()
			Shorcuts.init()

			// new Items(Path, EM);
			Items.init()

			fireNavigation = function (e) {
				if (e.ctrlKey) {
					return openInNewTab('http://' + CONFIG.localhost + '#' + $(this).attr('data-href'))
				}
				e.data.em.fire('update-path',
					$(this).attr('data-href')
				)
			}

			// to avoid repetion and mutilple listeners
			$(document.body).on('click', '[data-href]', {"em": EM}, fireNavigation)

			$('[data-toggle="tooltip"]').tooltip()

			EM.fire('navigate', location.hash.slice(1) || '/')

		}
		$(document).ready(function runner () {
			$.ajax({
				url: "server.php",
				method: "GET", // explicit is better than implicit
				data: {
					"getconfig": "yes"
				}
			}).done(function setGlobalConfig(config) {
				CONFIG = $.extend({ // makes it global
					browsing_animation_total_time: 500,
					deployment_transition_time: 250,
					exclude_projects: ["_nlfb"],
					hidden_files: ["*.pyc"],
					hidden_folders: ['.git'],
					"supported_icons": {
						"ai"          : "ai",
						"coffee"      : "coffee",
						"css"         : "css",
						"ctp"         : "ctp",
						"editorconfig": "editorconfig",
						"eps"         : "eps",
						"gif"         : "gif",
						"git*"        : "git",
						"htaccess"    : "htaccess",
						"html?"       : "html",
						"js"          : "js",
						"json"        : "json",
						"less"        : "less",
						"md"          : "md",
						"pdf"         : "pdf",
						"php"         : "php",
						"psd"         : "psd",
						"py"          : "py",
						"rb"          : "rb",
						"rust"        : "rust",
						"sass|scss"   : "sass",
						"sketch"      : "sketch",
						"styl"        : "styl",
						"sql"         : "sql",
						"sublime-*"   : "sublime",
						"txt"         : "txt",
						"pyc"         : "pyc",
						"xml"         : "xml",
						"ya?ml"       : "yml",
					},
					"localhost": "localhost"
				}, config)
				main()
			}).fail(function warningNoConfig() {
				alert('Error during loading config. Please report this problem at github.com/math2001/nlfb/')
			})
		})

	</script>

</body>
</html>