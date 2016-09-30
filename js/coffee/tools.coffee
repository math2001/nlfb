class Tools

	# this class manage
	#	- the context menu
	#	- refresh button
	#	- edit path button
	#	- dirname button

	@init: (@em, @path) ->
		@$dirname  = $('#dirname')
		@$refresh  = $('#refresh')
		@$editpath = $('#edit-path')
		@$editpathPanel = $('#path-edit-panel')
		@$editpathInput = @$editpathPanel.find('input')

		@bindDOM()
		@bindEvents()

	@bindEvents: () ->
		saveItems = ($items) ->
			@$items = $items

		@em.on('items-var-changed', saveItems.bind(@))

	@dirname = ->
			@em.fire('update-path', Path.dirname())

	@refresh = ->
		@em.fire('navigate', location.hash.slice(1))

	@isFocus: ->
		@$editpathInput.is(':focus')

	@showEditPathPanel = ->
		@$editpathPanel.fadeIn(400)
		@$editpathInput.focus()



	@bindDOM: () ->
		searchCommand = (e) ->
			$this = $(this)
			if e.keyCode == code('enter')
				path = $this.val()
				if path[0] != '/'
					path = e.data.this.path.join(path)
				e.data.this.em.fire('update-path', path)
				if not e.ctrlKey
					e.data.this.$editpathPanel.fadeOut()
					return $this.val('')
				return $this.val('')



			else if e.keyCode == code('escape')
				$this.val('')
				e.data.this.$editpathPanel.fadeOut()


		@$editpathInput.bind('keydown', { this: @ }, searchCommand)

		@$dirname.bind('click', @dirname.bind(@))
		@$refresh.bind('click', @refresh.bind(@))
		@$editpath.bind('click', @showEditPathPanel.bind(@))

		specificToItems =
			open:
				name: "Open in real",
				accesskey: "r"
				callback: @openInReal
			copy:
				name: "Copy",
				accesskey: "c"
				items:
					name:
						name: "Name",
						callback: @copyName

					path:
						name: "Path",
						callback: @copyPath

					pathForUrl:
						name: "Path for url",
						callback: @copyPath

		view =
			hiddenFiles:
				name: 'Toggle hidden items'
				callback: @toggleHiddenFiles.bind(@)

			sideBar:
				name: 'Toggle sidebar'
				callback: @toggleSidebar.bind(@)

			zoom:
				name: 'Zoom',
				items:
					'in':
						name: 'Zoom in'
						callback: @zoom.bind(@)
					'out':
						name: 'Zoom out'
						callback: @zoom.bind(@)


		$.contextMenu(
			selector: '.items'
			items: view
		)

		$.contextMenu(
			selector: '.item',
			items: $.extend specificToItems, view
		)

	# --- context menu functions ---

	@copyName: (key, opt) ->
		copyText(opt.$trigger.find('a').text())

	@copyPath: (key, opt) ->
		# console.log opt
		if key == 'pathForUrl'
			return copyText encodeURI opt.$trigger.attr 'data-href'
		else
			return copyText(opt.$trigger.attr('data-href'))

	@openInReal: (key, opt) ->
		console.log CONFIG.localhost
		openInNewTab('http://' + CONFIG.localhost + '/' + opt.$trigger.attr('data-href').slice(1))

	@toggleHiddenFiles: (key, opt) ->
		@$items.attr('hiding-files', if @$items.attr('hiding-files') == 'on' then 'off' else 'on')

	@zoom: (key, opt) ->
		Items.zoom(key)
		return false # keep the context menu open

	@toggleSidebar: (key, opt) ->
		Sidebar.toggle()