class Hash
	# manage the hash (location.hash)

	@init: (@em) ->
		@bindDOM()
		@bindEvents()

	@bindEvents: ->
		updatePath = (path) ->
			location.hash = '#' + path
		@em.on('update-path', updatePath)

	@bindDOM: ->
		fireNavigation = ->
			@em.emit('navigate', location.hash.slice(1))
		$(window).bind('hashchange', fireNavigation.bind(@))

