class Sidebar

	@init: ->
		@$sidebar = $('#sidebar')
		@$projects = @$sidebar.find('.projects')
		@$sidebarResizer = $('#sep')
		@template = $('#sidebar-template').html()
		
		@loadItems({ path: '/', $target: @$projects, init: true })
		@bindDOM()
		@bindEvents()

		@resizingSidebar = false

	@loadItems: (kwargs) ->
		return console.error('Need path to load items.') if kwargs.path == undefined
		return console.error('Need target to load items.') if kwargs.$target == undefined

		fail = ->
			alert 'error during loading sidebar! (ajax)'

		done = (mess, type, jqXHR) ->
			if kwargs.path == '/'
				folders = {}
				toShow = $.arrayDiff(Object.keys(mess.folders), CONFIG.exclude_projects)
				add = (key, val) ->
					folders[key] = val if toShow.indexOf(key) >= 0
				forEach(mess.folders, add)
			else
				folders = mess.folders

			@render({ 
				folders: folders
				$target: kwargs.$target
				basePath: kwargs.path
				deploy: kwargs.deploy
				init: kwargs.init
			})

		$.ajax(
			url: "getitems.php"
			data: 
				path: kwargs.path
				filter: 'folders'
				noticer: 'hasFolder'
			method: 'GET'
		)
		.done done.bind(@)
		.fail fail

	@bindEvents: ->
		updateItemsVar = ($items) ->
			@$items = $items
		EM.on('items-var-changed', updateItemsVar.bind(@))

	@bindDOM: ->
		showDeeper = (e) ->
			$this = $(this)
			paramsToLoadFunction = {
				path: $this.next('a').attr('data-href').slice(1)
				$target: $this.parent()
			}
			if $this.attr('deployed') == 'off'
				paramsToLoadFunction.deploy = true
				$this.attr('deployed', 'on')
			else
				paramsToLoadFunction.deploy = false
				$this.attr('deployed', 'off')
			e.data.this.loadItems(paramsToLoadFunction)

		startResizeSidebar = ->
			@resizingSidebar = true
			$(document.body).css('cursor', 'col-resize')

		stopResizeSidebar = ->
			@resizingSidebar = false
			$(document.body).css('cursor', '')

		resizeSidebar = (e) ->
			if not @resizingSidebar
				return
			e.preventDefault()
			x = (e.clientX / document.body.clientWidth) * 100
			@$sidebar.css('width', x + '%')
			@$sidebarResizer.css('left', x + '%')
			@$items.parent().css('width', (100 - x) + '%')
			return x

		@$sidebarResizer.bind('mousedown', startResizeSidebar.bind(@))
		$(document.body)
			.bind('mouseup', stopResizeSidebar.bind(@))
			.bind('mousemove', resizeSidebar.bind(@))

		@$sidebar.on('click', '.spoiler-button', { this: @ }, showDeeper)

	@render: (kwargs) ->
		return console.error('Need folders to render.') if kwargs.folders == undefined
		return console.error('Need path to render.') if kwargs.basePath == undefined
		return console.error('Need target to render.') if kwargs.$target == undefined

		dataForTemplate = { folders: [] }

		formatDataForTemplate = (name, hasFolder) ->
			dataForTemplate.folders.push(
				name: name
				hasFolder: hasFolder
				path: Path.join(name, kwargs.basePath)
			)

		forEach(kwargs.folders, formatDataForTemplate)
		if kwargs.init == true
			return kwargs.$target.html(Mustache.render(@template, dataForTemplate))

		if kwargs.deploy
			$toDeploy = kwargs.$target.find('ul')
			if $toDeploy.length == 0
				$toDeploy = $(Mustache.render(@template, dataForTemplate)).slideUp(0)
				kwargs.$target.append($toDeploy)
			$toDeploy.slideDown()
		else
			kwargs.$target.find('ul').first().slideUp()

