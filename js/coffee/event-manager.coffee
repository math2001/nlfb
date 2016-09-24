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
		for fn in @listeners[eventName]
			fn(data)
		@