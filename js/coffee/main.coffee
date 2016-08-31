advancedResearch = (arr, pattern) ->

	return arr if pattern == '.'

	match = (text, pattern) ->
		lastIndex = 0
		indexes = []

		for letter in pattern
			index = text.indexOf(letter, lastIndex)
			return false if index == -1

			lastIndex = index
			indexes.push(index)
		return indexes
		

	highlightLetters = (word, indexes) ->
		newWord = ''
		for letter, i in word
			if indexes.indexOf(i) != -1
				newWord += "<b>#{letter}</b>"
			else
				newWord += letter
		return newWord

	results = []

	for el in arr
		indexes = match(el, pattern)
		if indexes != false
			results.push(highlightLetters(el, indexes))

	return results

addItemsTo = ($el, dirs=[], files=[]) ->
	dirImg = '<img src="img/folder.svg" alt="folder">'
	for dir in dirs
		$el.append("<li contextmenuc='item-contextmenu' class=item data-href='#{getPath(dir)}'>#{dirImg} <a>#{dir}</a></li>")
	for file in files
		$el.append(
			"<li contextmenuc='item-contextmenu' class=item data-href='#{getPath(file)}'>
				<img src='img/file_types/#{getFileType(file)}.svg' onerror='this.src=\"img/file_types/default.svg\"'>
				<a>#{file}</a>
			</li>")
	null

shortenPath = (liCounter) ->
	$(window.$breadcrumb.find('li')[liCounter]).hide()
	liCounter++
	window.$breadcrumb.prepend('<li>...</li>') if liCounter == 1
	if window.$breadcrumb.height() > 60
		return shortenPath(liCounter)
	return liCounter

updateBreadcrumb = ->
	window.$breadcrumb.html('')
	window.$breadcrumb.append('<li nb=-1><a href="#">Localhost<a></li>')
	splitedPath = getPath()
	if splitedPath == '.'
		return true 

	splitedPath = splitedPath.split('/')
	for pathBit, i in splitedPath
		window.$breadcrumb.append(
			$('<li></li>').append(
				$('<a></a>')
				.text(pathBit)
				.attr('href', '#' + splitedPath.slice(0, i + 1).join('/'))
			)
		)

	shortenPath(0) if window.$breadcrumb.height() > 60
	return true

update = (mess, type, jqXHR) ->

	updateBreadcrumb()

	folderContent = () ->
		extract mess, window
		$new = $ '<ul></ul>'
		$new.addClass('items')
		if len(dirs) + len(files) == 0
			$new.html('<p class="cd-empty">Empty</p>')
		else
			addItemsTo($new, dirs, files)
		
		$new

	codeContent = ->
		$new = $ '<pre></pre>'
		$new.addClass('items').append(
			$('<code></code>').html(mess.replace(/\t/g, '  ')).addClass(getFileType(str(location.hash), true))
		)
		$new

	imageContent = ->
		$new = $('<div></div>')
			.addClass('items')
			
			.append(
				$('<img>')
				.attr('src', mess)
				.addClass('atomic-center')
				.css({
					"max-width": "100%",
					"max-height": "100%"
				})
			)

	if jqXHR.getResponseHeader('content-type') == 'application/json'
		func = folderContent
	else if jqXHR.getResponseHeader('content-type') == 'text/html'
		func = codeContent
	else if jqXHR.getResponseHeader('content-type').indexOf 'image' > -1
		func = imageContent

	window.files = null
	window.dirs = null

	# totalTime = (if window.config != undefined then window.config.totalTime else false) || 500
	time = Config.get('totalSlideTime') / 2
	window.$items.animate({
		opacity: 0,
		overflow: "hidden",
		left: -50
		right: 50
	}, time,  ->
		$new = func()
		$new.attr('showing', 'on')
		if $new[0].nodeName.toLowerCase() == 'pre'
			hljs.highlightBlock($new[0])

		window.$items.after($new)
		$new.animate({
			opacity: 1,
			left: 10,
			right: 0
		}, time, ->
			$new.attr('showing', 'off')
		)
		window.$items.remove()
		window.$items = $new
	)

loadDirs = (path=false, func=false, data=false) ->
	$.ajax({
		url: "./index.server.php",
		method: "GET", 
		data: $.extend({
			path: path || getPath()
		}, data || {})
	}).done(func || update).fail((jqXHR, type, obj) ->
		say('Error: Fail on loading files from server!')
		console.info jqXHR.getAllResponseHeaders()
	)

loadProjects = ($el=window.$sidebar) ->
	add = (dirs, type, $infos) ->
		if $infos.getResponseHeader('content-type') != 'application/json'
			say('unnable to load projects!')
			return console.info $infos.getAllResponseHeaders()

		$ul = window.$sidebar.find('ul').first()
		$ul.find('li').remove()
		forEach(dirs, (dir, has_folder) ->
			$ul.append(
				$('<li></li>')
				.append(
					if has_folder then '<span class="spoiler-button"></span>'  else '<span class="spoiler-replace"></span>'
				)
				.append(
					$('<a></a>')
					.text(dir)
					.attr('data-href', dir)
				)
			)
		)
	loadDirs('.', add, { forsidebar: 'yes' })

handleExpandFolder = () ->
	$this = $(this)
	path = $this.next('a').attr('data-href')
	if $this.attr('deployed') == 'on'
		$this.attr('deployed', 'off')
		return $this.parent().find('ul').slideUp()

	$ul = $this.parent().find('ul').first()
	if len($ul) != 0
		$this.attr('deployed', 'on')
		return $ul.slideDown()


	loadDirs(path, (dirs, type, $infos) ->
		console.info 'loadDirs from server'
		$ul = $('<ul></ul>').hide()
		forEach(dirs, (dir, has_folder) ->
			$ul.append(
				$('<li></li>')
				.append(if has_folder then '<span class="spoiler-button"></span>' else '<span class="spoiler-replace"></span>')
				.append(
					$('<a></a>')
					.text(dir)
					.attr('data-href', path + '/' + dir)
				)
			)
		)
		$this.parent().append($ul)
		$this.attr('deployed', 'on')
		$ul.slideDown()
	, { forsidebar: 'yes' })

manageSideBarResize = () ->
	window.resizingSidebar = false
	window.$sep.bind('mousedown', ->
		console.log 'resizingSidebar'
		window.resizingSidebar = true
	)
	$(document).bind('mouseup', ->
		window.resizingSidebar = false
	).bind('mousemove', (e) ->
		if !window.resizingSidebar
			return true
		e.preventDefault()
		window.$sep.css('left', e.clientX)
		window.$sidebar.css('width', e.clientX)
		window.$main.css('width', document.body.clientWidth - e.clientX)
	)

manageSearch = ->
	$(document).bind('keydown', ->
		window.$search.focus()
	)
	window.$search.bind('input', (e) ->
		if window.files == null or window.dirs == null
			$(this)
				.val('')
				.addClass('error')

			return true
		val = $(this).removeClass('error').val()
		if val == ''
			files = window.files
			dirs = window.dirs
		else
			files = advancedResearch(window.files, val)
			dirs = advancedResearch(window.dirs, val)
		window.$items.html('')
		addItemsTo(window.$items, dirs, files)
	)

manageContextMenu = ->

	window.lastContextMenuFromElement = null
	window.toRemoveFocus = null

	contextMenuTime = Config.get('contextMenuTime')

	$(document).on('contextmenu', 'li[data-href]', (e) ->
		e.preventDefault()
		window.lastContextMenuFromElement = this
		window.toRemoveFocus = $(this).attr('focused', 'on')
		window.$contextmenu.css({
			top: e.clientY - 16,
			left: e.clientX	
		}).fadeIn()
		# console.log window.$contextmenu.length
	)

	hide = ->
		window.$contextmenu.fadeOut(contextMenuTime)
		window.toRemoveFocus.attr('focused', 'off') if window.toRemoveFocus != null



	window.$contextmenu.bind('clickoutside', hide)
	window.$contextmenu.bind('mousedownoutside', hide)
	window.$contextmenu.find('[class*=action]').bind('click', hide)

$(window).ready( ->

	Config.init()

	window.$main        = $ '#main'
	window.$items       = $ '.items'
	window.$breadcrumb  = $ '.breadcrumb'
	window.$sidebar     = $ '#sidebar'
	window.$sep         = $ '#sep'
	window.$search      = $ '#search'
	window.$contextmenu = $ '#item-contextmenu'

	loadDirs()
	loadProjects()

	$('#refresh').click(->
		loadDirs()
	)

	manageSearch()
	manageSideBarResize()
	manageContextMenu()

	$(window).bind('hashchange', ->
		loadDirs()
	)

	$('#move-up').bind('click', ->
		location.hash = moveUp(location.hash)
	)

	$(document).on('click', '[data-href]', ->
		location.hash = $(this).attr('data-href')
	).on('click', '.spoiler-button', handleExpandFolder)
)