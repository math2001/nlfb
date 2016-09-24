class Path

	@init: (@em) ->
		@path = '/'
		@bindEvents()

	@join: (to) ->
		path = @path.split('/')
		path.remove('')
		path.push(to.strip('/'))
		'/' + path.join('/')

	@go: ->
		for arg in arguments
			@path = @join(arg)
		@

	@dirname: (times=1) ->
		@path = @path.split('/')
		for i in [0..times]
			if @path.get(-1) != '..'
				@path = @path.slice(0, -1)
			else
				@path.push('..')
		@path = @path.join('/')
		@

	@bindEvents: ->
		editPath = (path) ->
			@path = path
		@em.on('navigate', editPath.bind(@))

