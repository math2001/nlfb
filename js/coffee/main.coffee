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

	isImage = (file) ->
		$.inArray(getFileType(file), Config.get('imgExt')) > -1

	dirImg = '<img src="img/folder.svg" alt="folder">'
	hide = ''
	for dir in dirs
		hide = if $.inArray(dir, Config.get('iFolders')) > -1 then ' item-hide' else ''
		$el.append("<li contextmenuc='item-contextmenu' class='item#{hide}' data-href='#{getPath(dir)}'>#{dirImg} <a>#{dir}</a></li>")
	for file in files
		hide = if $.inArray(dir, Config.get('iFiles')) > -1 then ' item-hide' else ''

		if isImage file
			iconPath = Path.abs Path.valid(location.hash.slice(1), removeTags(file))
		else
			iconPath = "img/file_types/#{getFileType(file, false)}.svg"
		$el.append(
			"<li contextmenuc='item-contextmenu' class='item#{hide}' data-href='#{getPath(file)}'>
				<img src='#{iconPath}' onerror='this.src=\"img/file_types/default.svg\"'>
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

update = (mess, type, jqXHR, isFolderForSure=false) ->
	updateBreadcrumb()

	folderContent = () ->
		extract mess, window
		$new = $ '<ul></ul>'
		$new.addClass('items')
		if len(dirs) + len(files) == 0
			if type == 'fail' then msg = '...' else 'Empty'
			$new.html("<p class=\"cd-empty\">#{msg}</p>")
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

	if isFolderForSure == true or jqXHR.getResponseHeader('content-type') == 'application/json'
		func = folderContent
	else if jqXHR.getResponseHeader('content-type') == 'text/html'
		func = codeContent
	else if jqXHR.getResponseHeader('content-type').indexOf 'image' > -1
		func = imageContent

	window.files = null
	window.dirs = null

	time = Config.get('totalSlideTime') / 2
	window.$items.animate({
		opacity: 0,
		overflow: "hidden",
		left: -50
		right: 50
	}, time,  ->
		$new = func()
		$new.attr('hiding-files', window.$items.attr('hiding-files'))
		$new.attr('view-mode', window.$items.attr('view-mode'))
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
	currentPath = location.hash
	path = getPath() if path == false
	$.ajax({
		url: "./index.server.php",
		method: "GET", 
		data: $.extend({
			path: path
		}, data || {})
	}).done(func || update).fail((jqXHR, type, obj) ->
		window.modals.simple("404!", "
			<p>An error has occurred while we were loading files at <code>#{path}</code> from server.</p>
			<pre>#{jqXHR.getAllResponseHeaders()}</pre>
		", "error")
		update({files: [], errors: [], dirs: []}, 'fail', jqXHR, true)
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
			if !$.inArray(dir, Config.get('iProjects'))
				return false
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

manageEditPath = () ->
	window.$editPathInput = $('<input type="text">')
			.attr('placeholder', 'Path...')
	window.isEditPathHidden = true

	hideEditPath = ->
		window.$editPathInput.unbind()
		window.$breadcrumb.html(window.prevBreadcrumbHtml)
		if Config.get('emptyEditPathValueOnHide')
			window.$editPathInput.val('')
		window.isEditPathHidden = true

		
	window.$editPath.bind('click', ->
		if window.isEditPathHidden == true
			window.isEditPathHidden = false
			window.$editPathInput.bind('keydown', (e) ->
				if e.keyCode == code('enter')
					path = $(this).val()
					if path == location.hash.slice(1)
						loadDirs() # refresh
					else
						unless path[0] == '/'
							path = pathJoin(location.hash.slice(1), path)
						else
							path = path.slice(1)
						hideEditPath()
						location.hash = '#' + path

				else if e.keyCode == code('escape')
					hideEditPath()
			).bind('blur', ->
				hideEditPath()
			)
			window.prevBreadcrumbHtml = window.$breadcrumb.html()
			window.$breadcrumb.html(window.$editPathInput)
			window.$editPathInput.focus()
		else
			hideEditPath()
	)

class ManageEditPath

	constructor: ->
		@$input = $('<input type="text">')
		.attr('placeholder', 'Path...')
		@isHide = true
		@prevBreadcrumbHtml = ''
		_this = @
		$('#edit-path').bind('click', (e) ->
			if _this.isHide
				_this.show()
			else
				_this.hide()
		)

	show: ->
		@isHide = false
		@prevBreadcrumbHtml = window.$breadcrumb.html()
		window.$breadcrumb.html(@$input)
		@$input.focus()
		_this = @
		@$input.bind('keydown', (e) ->
			if e.keyCode == code('enter')
				path = _this.$input.val()
				unless path[0] == '/'
					path = pathJoin(location.hash.slice(1), path)
				path = Path.valid(path)
				location.hash = '#' + path
				_this.hide()
			if e.keyCode == code('escape')
				_this.$input.trigger('blur')
		).bind('blur', ->
			_this.hide()
		)

	hide: ->
		@isHide = true
		window.$breadcrumb.html(@prevBreadcrumbHtml)
		@$input.val('') if Config.get('emptyEditPathValueOnHide')

	input: ->
		return @$input


manageSideBarResize = () ->
	window.resizingSidebar = false
	window.$sep.bind('mousedown', ->
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
	).bind('keydown', (e) ->
		if e.keyCode == code('escape')
			window.$search.blur()
	)

$(window).ready( ->

	Config.init()

	window.$editPath    = $ '#edit-path'
	window.$main        = $ '#main'
	window.$items       = $ '.items'
	window.$breadcrumb  = $ '.breadcrumb'
	window.$sidebar     = $ '#sidebar'
	window.$sep         = $ '#sep'
	window.$search      = $ '#search'
	window.$contextmenu = $ '#item-contextmenu'

	window.$document = $ document

	window.editPath = new ManageEditPath()
	window.modals = new ModalsManager()

	window.$document.bind('keydown', (e) ->
		canFocusSomething = $(':focus').length == 0
		if e.keyCode == code('f') and canFocusSomething
			e.preventDefault()
			window.$search.focus()
		else if e.keyCode == code('e') and canFocusSomething
			window.editPath.show()
			e.preventDefault()
		else if (
			canFocusSomething and window.modals.hasAModalFocused and 
			$.inArray(e.keyCode, [code(' '), code('enter')])
		)
			e.preventDefault()
			window.modals.hideThemAll()

	)
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