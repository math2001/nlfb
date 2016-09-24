class Tools

	# this class manage
	#	- the context menu
	#	- refresh button
	#	- edit path button
	#	- dirname button
	
	@init: (@em) ->
		@$dirname  = $('#dirname')
		@$refresh  = $('#refresh')
		@$editpath = $('#edit-path')

		@bindDOM()

	@bindDOM: () ->
		dirname = ->
			@em.fire('update-path', Path.dirname())

		refresh = ->
			@em.fire('navigate', location.hash.slice(1))

		@$dirname.bind('click', dirname.bind(@))
		@$refresh.bind('click', refresh.bind(@))

