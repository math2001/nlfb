class Config

	@init: (config=false) ->

		default_config = 
			totalSlideTime: 500
			localhost: 'localhost'
			imgExt: ['jpg', 'png', 'bmp', 'jpeg', 'gif', 'ico', 'svg']
			changeViewModeTime: 400
			emptyEditPathValueOnHide: true
			iProjects: ['_nlfb']
			iFolders: ['.git']
			iFiles: []

		window._config = if config then $.extend default_config, config else default_config

	@get: (key, def=undefined) ->
		if window._config[key] != undefined
			return window._config[key]
		else if def != undefined
			return def
		else
			console.error "config: the key #{key} is unset!"
			return undefined


