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
	
				@render(@files, @folders)

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
			@render(mess.files, mess.folders, 'search')

		@em.on('search', renderSearch.bind(@))

		normalRender = ->
			@render(@files, @folders)

		@em.on('empty-search', normalRender.bind(@))


	render: (files, folders, type=null) ->
	# render: (kwargs={}) ->

		data = {
			files: [],
			folders: [],
		}
		filesIter = (file, val) ->

			fileData = { name: file, path: @path.join(file) }
			if type == 'search'
				[isImage, htmlName] = val
				fileData.name = htmlName # letters are bolded
			else
				isImage = val

			if isImage # it is an image
				fileData.icon = fileData.path
			else
				fileData.icon = './img/file_types/default.svg'
			data.files.push(fileData)
	
		foldersIter = (folder, val) ->
			folderData = { name: folder, path: @path.join(folder) }
			if type == 'search'
				[hasIndex, htmlName] = val
				folderData.name = htmlName # letters are bolded
			else
				hasIndex = val
			if hasIndex
				folderData.icon = './img/folder-index.svg'
			else
				folderData.icon = './img/folder.svg'
			data.folders.push(folderData)

		if files isnt null
			forEach(files, filesIter.bind(@))
		if folders isnt null
			forEach(folders, foldersIter.bind(@))
		if files is null and folders is null
			console.log 'empty!'


		@$items.html(Mustache.render(@template, data))
		
	