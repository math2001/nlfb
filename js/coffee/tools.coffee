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
			
		@$dirname.bind('click', dirname.bind(@))

