class Path

	@path = '/'

	@join: (to) ->
		return @path + to.strip('/') + '/'

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

