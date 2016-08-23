function array_diff(arr1, arr2) {
	var arr = [];
	for (var i = arr1.length - 1; i >= 0; i--) {
		if (!arr2.find(arr1[i])) arr.push(arr1[i])
	}
}

function say() {
	window.alert(arr(arguments, true).join('\n'))
}
function code(letter) {
	if (letter == 'ctrl') return 17 
	if (letter == 'alt') return 18 
	if (letter == 'escape') return 27
	return letter.charCodeAt(0) - 32
}

forEach = function (obj, func) {
	// function (key, value, obj, nb_key) { /* do stuff */ }
	var keys = Object.keys(obj);
	for (var i = 0; i < keys.length; i++) {
		func(keys[i], obj[keys[i]], obj, i)
	}
}

function isActive() {
	for (var i = 0; i < arguments.length; i++) {
		if (!window.currentPressKeys[code(arguments[i])]) {
			return false;
		}
	}
	return true
}

function quote(el) {
	// quote
	return '"' + el + '"'
}

function extend(obj1, obj2) {
	var obj = {}
	var keys1 = Object.keys(obj1)
	var keys2 = Object.keys(obj2)
	for (var i = 0; i < keys1.length; i++) {
		obj[keys1[i]] = obj1[keys1[i]]
	}
	for (var i = 0; i < keys2.length; i++) {
		obj[keys2[i]] = obj2[keys2[i]]
	}
	return obj
}

function advancedResearch(arr, pattern) {

	if (pattern == '') {
		return arr
	}

	function match(text, pattern) {
		var lastIndex = 0,
			indexes = [],
			index;
		for (var i = 0; i < pattern.length; i++) {
			index = text.indexOf(pattern[i], lastIndex)
			if (index == -1) {
				return false
			} else {
				lastIndex = index
				indexes.push(index)
			}
		}
		return indexes
	}

	function highlightLetters(text, indexes) {
		var newWord = '';
		for (var i = 0; i < text.length; i++) {
			if (indexes.indexOf(i) > -1) {
				newWord += '<b>'+text[i]+'</b>';
			} else {
				newWord += text[i]
			}
		}
		return newWord
	}

	var results = []

	for (var i = 0; i < arr.length; i++) {
		indexes = match(arr[i], pattern)
		if (indexes != false) {
			results.push(highlightLetters(arr[i], indexes))
		}
	}
	return results
}

function len(el) {
	// coucou
	return el.length;
}

function getType(path) {
	var extension = path.split('.'); 
	return extension[extension.length-1]
}

function strToUrl(string) { 
	// only one thing for now
	// return string.replace(' ', '%20') 
	return string
}

function trim(chars, char_to_remove) {
	var char_to_remove = typeof char_to_remove === "undefined" ? " " : char_to_remove;
	var start = 0, end = len(chars), cont = true
	for (var i = 0, char; char = chars[i]; i++) {
		if (char == char_to_remove && cont == true) {
			start++
		}
		else {
			cont = false
		}
	}
	cont = true
	var char;
	for (var i = chars.length - 1; i >= 0; i--) {
		char = chars[i];
		if (char == char_to_remove && cont == true) {
			end -= 1
		} else {
			cont = false
		}
	}

	return chars.slice(start, end) + '';
}

function arr(iter, good_order) {
	var good_order = typeof good_order === "undefined" ? true : good_order;
	var arr = [];
	if (good_order) {
		for (var i = 0; i < iter.length; i++) {
			arr.push(iter[i])
		}
		return arr
	}
	for (var i = iter.length - 1; i >= 0; i--) {
		arr.push(iter[i])
	}
	return arr
}

function getPath(invalidPath) {
	var path = location.hash;
	if (path[0] == '#') {
		path = path.slice(1, len(path))
	}
	path = trim(path, '/');
	if (invalidPath !== undefined) {
		path = path + '/' + strToUrl(invalidPath);
	}
	if (path == '') {
		path = '.'
	}
	path = path.replace(/<\/?[^>]+(>|$)/g, "");
	return path
}

function moveUp(path) {
	var path = typeof path === "undefined" ? location.hash.replace('#', '') : path;
	path = trim(path, '/').split('/')
	return path.slice(0, -1).join('/')
}

function addItems($el, dirs, files) {
	for (var i = 0; i < dirs.length; i++) {
		$el.append(
			'<li class="dir"><a data-href="#' +
			getPath(dirs[i]) +
			'" class="dir">' +
			dirs[i] +
			' </a></li>')
	}
	for (var i = 0; i < files.length; i++) {
		$el.append(
			'<li class="file">' +
				'<a data-href="#'+getPath(files[i])+'" class="file '+
				getType(files[i])+'">'+files[i]+' </a></li>')
	}
	return $el
}

function shortenPath(li_counter) {
	$(window.$breadcrumb.find('li')[li_counter]).hide()
	li_counter ++
	if (li_counter == 1) {
		window.$breadcrumb.prepend('<li>...</li>');
	}
	if (window.$breadcrumb.height() > 30) {
		return shortenPath(li_counter)
	}
	return li_counter
}

function updateBreadcrumb() {
	window.$breadcrumb.html('')
	window.$breadcrumb.append('<li nb=-1><a href="#">Localhost<a></li>')
	var splitedPath = getPath()
	if (splitedPath == '.')  {
		return true
	}
	splitedPath = splitedPath.split('/')
	for (var i = 0; i < splitedPath.length; i++) {
		window.$breadcrumb.append(
			$("<li>").attr('nb', i).append(
				$("<a>").text(splitedPath[i]).attr('href', '#' + splitedPath.slice(0, i + 1).join('/')))
		)
	}

	if (window.$breadcrumb.height() > 30) shortenPath(0)
	return true
}

function smoothUpdate($items, dirs, files, func) {
	var $items, time = 200;
	$items.animate({
		opacity: 0,
		overflow: "hidden",
		left: -50
	}, time, function () {
		func($items, dirs, files, time)
		$items.remove()
	})
}

function update(mess, type, jqXHR) {

	updateBreadcrumb();

	var $items = window.$items = $('.items').first();

	if (['text/plain', 'text/html'].indexOf(jqXHR.getResponseHeader('content-type')) > -1) {
		var path = getPath().split('/'),
			type = getType(path[path.length-1])

		smoothUpdate($items, [], [], function ($items, dirs, files, time) {
			var $new = $('<pre></pre>')
				.addClass('items')
				.attr('showing', 'on')
				.append(
				$('<code></code>').html(mess.replace(/\t/g, '  ')).addClass(type)
			)
			$items.after($new)
			hljs.highlightBlock($new[0]);
			$new.animate({
				opacity: 1,
				left: 0,
				right: 0
			}, time, function () {
				$new.attr('showing', 'off')
			})
		})
		return true
	} else if (jqXHR.getResponseHeader('content-type').indexOf('image') > -1) {
		// it is an image
		smoothUpdate($items, [], [], function ($items, dirs, files, time) {
			var $new = $('<div></div>')
				.addClass('items')
				.attr('showing', 'on')
				.append($('<img />')
					.attr('src', mess)
					.addClass('atomic-center')
					.css({
						"max-width": "100%",
						"max-height": "100%",
					}))
			$items.after($new)
			$new.animate({
				opacity: 1,
				left: 0,
				right: 0
			}, time, function () {
				$new.attr('showing', 'off')
			})
		})
		return true
	}
	var dirs, files;
	window.dirs = dirs = mess['dirs'] || []
	window.files = files = mess['files'] || []

	if (mess['errors'] !== undefined && mess['errors'].length != 0) {
		alert('there is some errors!')
		console.log(mess['errors']);
	}



	smoothUpdate($items, dirs, files, function ($items, dirs, files, time) {
		var $new = window.$items = $('<ul>')
			.addClass('items')
			.attr('showing', 'on')
		if (dirs.length == 0 && files.length == 0) {
			say('empty')
			$new.html('<p class="cd-empty">Empty</p>')
		} else {
			addItems($new, dirs, files)
		}
		$items.after($new)
		$new.animate({
			opacity: 1,
			left: 0,
			right: 0
		}, time, function () {
			$new.attr('showing', 'off')

		})
	})
}

function getDirs(path, func, data) {
	
	$.ajax({
		"url": "./index.server.php",
		"method": "GET",
		"data": extend({
			"path": path || getPath()
		}, data || {})
	}).done(func || update).fail(function (jqXHR, type, obj) {
		alert('fail on loading files!')
		console.log(Object.keys(obj), obj.stack);
		console.log(jqXHR.getAllResponseHeaders());
	})
}

function loadProjects() {
	getDirs('.', function (dirs, type, jqXHR) {
		if (jqXHR.getResponseHeader('content-type') != 'application/json') {
			return say('unable to load projects', jqXHR.getAllResponseHeaders())
		}

		var $ul = window.$sidebar.find('ul').first();
		$ul.find('li').remove();
		forEach(dirs, function (dir, has_folder) {
			$ul.append(
				$('<li></li>')
				.append((has_folder ? '<span class="spoiler-button"></span>' : 
					'<span class="spoiler-replace"></span>'))
				.append(
					$('<a></a>')
					.text(dir)
					.attr('data-href', '#' + dir)
				)
			)
		})
		return
		for (var i = 0; i < dirs.length; i++) {
			$ul.append(
				$('<li></li>')
				.append('<span class="spoiler-button"></span>')
				.append(
					$('<a></a>')
					.text(mess.dirs[i])
					.attr('data-href', '#' + mess.dirs[i])
				)
			)
		}

	}, { forsidebar: 'yes' })
}

function handleSideBarResize() {
	window.resizeSideBar = false
	
	window.$sep.bind('mousedown', function (e) {
		window.resizeSideBar = true
	})
	$(document).bind('mouseup', function (e) {
		window.resizeSideBar = false
	})
	$(document).bind('mousemove', function (e) {
		if (!window.resizeSideBar) {
			return true
		}
		e.preventDefault()
		window.$sep.css('left', e.clientX)
		window.$sidebar.css('width', e.clientX)
		window.$main.css('width', document.body.clientWidth - e.clientX)
	})
}

function handleResearch() {
	window.$search = $('#search')
	window.$search.bind('input', function (e) {
		if (window.$items[0].nodeName.toLowerCase() != 'ul') {
			console.log('return', window.$items[0].nodeName);
			return true
		}
		var val = $(this).val()
		var dirs = advancedResearch(window.dirs, val)
		var files = advancedResearch(window.files, val)
		window.$items.find('li').remove()
		addItems(window.$items, dirs, files)

	})
}

function handleShorcuts() {
	window.currentPressKeys = {}
	$(document)
		.bind('keydown', function (e) {
			window.currentPressKeys[e.keyCode] = true
		}).bind('keyup', function (e) {
			window.currentPressKeys[e.keyCode] = false
		}).bind('keypress', function (e) {
			window.$search.focus()
		})
	window.$search.bind('keydown', function (e) {
		if (e.keyCode == code('escape')) {
			window.$search.val('')
			window.$search.blur()
		}
	})
}

function handleExpandFolder() {
	var $this = $(this)
	if ($this.attr('deployed') == undefined || $this.attr('deployed') == 'off') {
		var $ul = $this.parent().find('ul').first()
		if ($ul.length == 0) {
			var path = $this.next('a').attr('data-href');
			path = path.slice(1, path.length)
			// get dirs and add them (in the function)
			getDirs(path, function (dirs, type, jqXHR) {

				var $ul = $('<ul></ul>').hide();
				forEach(dirs, function (dir, has_folder) {
					$ul.append(
						$('<li></li>')
						.append((has_folder ? '<span class="spoiler-button"></span>' : 
							'<span class="spoiler-replace"></span>'))
						.append(
							$('<a></a>')
							.text(dir)
							.attr('data-href', '#'+path+'/'+dir)
						)
					)
				})

				$this.attr('deployed', 'on')
				$this.parent().append($ul)
				$ul.slideDown(200)
				return

				for (var i = 0; i < mess.dirs.length; i++) {
					$ul.append(
						$('<li></li>').append('<span class="spoiler-button"></span>')
						.append($('<a></a>').text(mess.dirs[i]).attr('data-href', 
							'#'+path+'/'+mess.dirs[i]))
					)
				}
			}, { forsidebar: 'yes' })
		} else {
			$this.attr('deployed', 'on')
			$ul.slideDown(200)
		}
	} else {
		$this.parent().find('ul').first().slideUp(200);
		$this.attr('deployed', 'off')
	}
}

function openInNewTab(url) {
    $("<a>").attr("href", url).attr("target", "_blank")[0].click();
}

$(window).ready(function() {
	
	window.$sep = $('#sep');
	window.$sidebar = $('#sidebar')
	window.$main = $('#main')
	window.$breadcrumb = $('.breadcrumb');


	$(document).on('dblclick', '[data-href]', function (e) {
		// Why do I do this? just to trick the navigator, he does not show the link at the 
		// bottom/left of the screen and hide stuff
		location = $(this).attr('data-href')

	})
	.on('click', '.projects [data-href]', function (e) {
		location = $(this).attr('data-href')
	})
	.on('click', '.spoiler-button', handleExpandFolder)
	.on('click', '.items li a', function (event) {
		var $this = $(this)
		$this.parent().parent().find('li a[focused=on]').attr('focused', 'off')
		$this.attr('focused', 'on')
	})

	$(window).bind('hashchange', function () {
		getDirs();
	})
	$('#refresh').bind('click', function () {
		getDirs();
	})
	$('#move-up').bind('click', function (e) {
		location.hash = moveUp(location.hash)
		getDirs();
	});

	$('#open-in-browser').click(function () {
		var $focused = window.$items.find('li a[focused=on]')
		var path;
		if ($focused.length == 0) {
			path = location.hash
		} else {
			path = $focused.attr('data-href')
		}
		path = path.slice(1, path.length)
		// location = path
		openInNewTab(path)

	})

	getDirs();
	// hljs.initHighlightingOnLoad();

	loadProjects();
	
	handleSideBarResize();
	handleResearch();
	handleShorcuts();
})

