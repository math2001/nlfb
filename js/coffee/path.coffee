class Path

	@init: (@em) ->
		@path = location.hash.slice(1) or '/'
		@bindEvents()

	@join: (to) ->
		path = @path.split('/')
		path.remove('')
		path.push(to.strip('/'))
		'/' + path.join('/')

	@dirname: (times=1) ->
		path = @path.split('/')
		path.remove('')
		for i in [0...times]
			if path.get(-1) != '..' and path.length > 0	
				path = path.slice(0, -1)
			else
				path.push('..')
		path = '/' + path.join('/')
		path

	@extension: (path) ->
		(path or @path).split('/').get(-1).split('.').get(-1)

	@bindEvents: ->
		editPath = (path) ->
			@path = path
		@em.on('navigate', editPath.bind(@))

