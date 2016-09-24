class Items


	constructor: (@path, @em) ->
		@files = {}
		@folders = {}
		@$items = $('.items')
		@template = $('#items-template').html()

		@loadItems()

		@bindDOM()
		@bindEvent()



	loadItems: (path) ->

		done = (mess, textStatus, jqXHR) ->

			if jqXHR.getResponseHeader('content-type') == 'HTTP/1.0 404 Not Found'
				alert('error on load file')
				console.log jqXHR.getAllResponseHeader()

			@files = mess.files
			@folders = mess.folders

			@render()

		fail = () ->
			alert('fail on loading!')
			console.log arguments

		$.ajax
			url: "getitems.php",
			method: "GET",
			data: 
				path: path or @path.path
				noticer: 'index'
		.done done.bind(@)
		.fail fail.bind(@)

	
	bindDOM: ->
		fireNavigation = (e) ->
			e.data.this.em.emit('update-path',
				$(this).attr('data-href').slice(1)
			)

		$(document.body).on('click', '.item[data-href]', {"this": @}, fireNavigation)

	bindEvent: ->
		# listen to the event manager to reload items.
		@em.on('navigate', @loadItems.bind(@))


	render: (files, folders) ->

		data = {
			files: [],
			folders: [],
		}
		filesIter = (file, isImage) ->
			fileData = { name: file, path: @path.join(file) }
			if isImage
				fileData.icon = fileData.path
			else
				fileData.icon = './img/file_types/default.svg'
			data.files.push(fileData)

		
		foldersIter = (folder, hasIndex) ->
			folderData = { name: folder, path: @path.join(folder) }
			if hasIndex
				folderData.icon = './img/folder-index.svg'
			else
				folderData.icon = './img/folder.svg'
			data.folders.push(folderData)

		forEach(files or @files, filesIter.bind(@))
		forEach(folders or @folders, foldersIter.bind(@))

		@$items.html(Mustache.render(@template, data))
		
	