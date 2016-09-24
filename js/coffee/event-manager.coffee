class EM

	@listeners = {}

	@on: (eventName, fn) ->
		if typeof @listeners[eventName] == "undefined"
			@listeners[eventName] = []

		@listeners[eventName].push(fn)
		@

	@off: (eventName, fnToRemove) ->
		@listeners[eventName].remove(fn)
		@

	@emit: (eventName, data) ->
		if typeof @listeners[eventName] == "undefined"
			return console.error("Unknown event '#{eventName}'")
		if typeof data == 'string'
			dataToRender = data.wrap()
		else
			dataToRender = data

		console.info 'emit', eventName.wrap(), 'with', dataToRender

		for fn in @listeners[eventName]
			fn(data)
		@