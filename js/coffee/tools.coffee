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


	@bindDOM: () ->
		dirname = ->
			@em.fire('update-path', Path.dirname())

		refresh = ->
			@em.fire('navigate', location.hash.slice(1))

		showEditPathPanel = ->
			@$editpathPanel.fadeIn(400)
			@$editpathInput.focus()

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

		@$dirname.bind('click', dirname.bind(@))
		@$refresh.bind('click', refresh.bind(@))
		@$editpath.bind('click', showEditPathPanel.bind(@))

