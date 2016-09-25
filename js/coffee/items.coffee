class Items

	constructor: (@path, @em) ->
		@files = {}
		@folders = {}
		@$items = $('.items')
		@template = $('#items-template').html()

		@bindEvent()

	loadItems: (path) ->

		done = (mess, textStatus, jqXHR) ->
			if jqXHR.getResponseHeader('content-type') == 'application/json'

				# mess.files and mess.folders are OBJECT, not ARRAY

				dataForEvent = {}

				if Object.keys(mess.files).length > 0
					@files =  mess.files
					dataForEvent.files = copyObject(@files)
				else
					@files = dataForEvent.files = null

				if Object.keys(mess.folders).length > 0
					@folders =  mess.folders
					dataForEvent.folders = copyObject(@folders)
				else
					@folders = dataForEvent.folders = null


				@em.fire('got-items', dataForEvent) # share files and folders
	
				@render({
					files: @files
					folders: @folders
					type: 'files and folders'	
				})

			else if jqXHR.getResponseHeader('content-type') == 'text/plain'
				# do super stuff
			else
				# coffeescript apparently cannot handle a finninshing else if



		fail = (jqXHR, textStatus, errorThrown) ->
			alert('Fail on loading!')
			console.error 'Fail on loading:', textStatus
			console.warn jqXHR.getAllResponseHeaders()
			console.warn jqXHR.responseText
			
		path = path or @path.path
		$.ajax
			url: "getitems.php",
			method: "GET",
			data: 
				path: path
				noticer: 'index'
		.done done.bind(@)
		.fail fail.bind(@)

	bindEvent: ->
		# listen to the event manager to reload items.
		@em.on('navigate', @loadItems.bind(@))

		renderSearch = (mess) ->
			# @render(mess.files, mess.folders, 'search')
			@render(
				type: 'files and folders'
				files: mess.files,
				folders: mess.folders
				isSearch: true
			)

		@em.on('search', renderSearch.bind(@))

		normalRender = ->
			@render(
				type: 'files and folders'
				files: @files,
				folders: @folders
			)

		@em.on('empty-search', normalRender.bind(@))


	# render: (files, folders, type=null) ->
	render: (kwargs={}) ->

		if kwargs.type == undefined
			return console.error "Don't know the type, impossible to render!"

		if kwargs.type == 'files and folders'

			if kwargs.files == undefined or kwargs.folders == undefined
				return console.error 'Files or folders are undefined. UNACCEPTABLE!'

			templateData = {
				files: [],
				folders: [],
			}

			filesIter = (file, val) ->
				fileData = { name: file, path: @path.join(file) }
				if kwargs.isSearch is true
					[isImage, htmlName] = val
					fileData.name = htmlName # letters are bolded
				else
					isImage = val

				if isImage # it is an image
					fileData.icon = fileData.path
				else
					fileData.icon = './img/file_types/default.svg'
				templateData.files.push(fileData)
		
			foldersIter = (folder, val) ->
				folderData = { name: folder, path: @path.join(folder) }
				if kwargs.isSearch is true
					[hasIndex, htmlName] = val
					folderData.name = htmlName # letters are bolded
				else
					hasIndex = val
				if hasIndex
					folderData.icon = './img/folder-index.svg'
				else
					folderData.icon = './img/folder.svg'
				templateData.folders.push(folderData)

			if kwargs.files isnt null
				forEach(kwargs.files, filesIter.bind(@))
			if kwargs.folders isnt null
				forEach(kwargs.folders, foldersIter.bind(@))

			if kwargs.files is null and kwargs.folders is null
				console.log 'empty!'
		else
			console.error "Unknown type '#{kwargs.type}'! Impossible to render."

		@$items.html(Mustache.render(@template, templateData))
		
	