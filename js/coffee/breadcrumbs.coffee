class Breadcrumbs


	@init: (@em, @path) ->
		@$el = $('#breadcrumbs')
		@template = $('#breadcrumbs-template').html()
		# @render()
		@bindEvents()

	@render: (path=@path.path) ->

		path = path.split('/').remove('')
		data = {
			splitedPath: [
				{ name: 'localhost', path: '/' }
			]
		}
		for bit, i in path
			data.splitedPath.push({
				name: bit,
				path: path.slice(0, i + 1).join('/')
			})

		@$el.html(Mustache.render(@template, data))

	@bindEvents: ->
		@em.on('navigate', @render.bind(@))

