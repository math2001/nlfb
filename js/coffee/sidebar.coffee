class Sidebar

	@init: ->
		@$sidebar = $('#sidebar').find('.projects')
		@template = $('#sidebar-template').html()
		
		@loadItems({ path: '/', $target: @$sidebar, init: true })
		@bindDOM()

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
		console.log kwargs.$target.find('ul').first().slideUp()

