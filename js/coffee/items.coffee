class Items

	@init:  ->
		@files = {}
		@folders = {}
		@$items = $('.items')
		@templates =
			'files and folders': $('#items-template-faf').html()
			'code': $('#items-template-code').html()
			'image': $('#items-template-image').html()

		@bindEvent()


	@getIconForFile: (extension) ->
		ext = 'default'
		forEach(CONFIG.supported_icons, (glob, file) ->
			if globMatch(glob, extension)
				ext = file
				return 'stop'
		)
		return "./img/file_types/#{ext}.svg"

	@zoom: (zoomIn) ->
		if typeof zoomIn == 'string'
			zoomIn = zoomIn == 'in'
		if zoomIn == true
			value = parseInt(@$items.attr('data-zoom')) + 1
			if value <= parseInt(@$items.attr('data-zoom-max'))
				@$items.attr('data-zoom',  value)
		else
			value = parseInt(@$items.attr('data-zoom')) - 1
			if value >= parseInt(@$items.attr('data-zoom-min'))
				@$items.attr('data-zoom',  value)


	@loadItems: (path) ->
		done = (mess, textStatus, jqXHR) ->

			contentType = jqXHR.getResponseHeader('content-type')

			if contentType.indexOf('application/json') >= 0

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


				EM.fire('got-items', dataForEvent) # share files and folders

				@render({
					files: @files
					folders: @folders
					type: 'files and folders'
				})

			else if contentType.indexOf('text/plain') >= 0
				# view code
				@render({ content: mess, type: 'code' })
			else if contentType.indexOf('image/png') >= 0
				@render({ path: Path.path, type: 'image' })
			else
				alert "Unknown content-type: '#{jqXHR.getResponseHeader('content-type')}'!"
				console.error "Unknown content-type: '#{jqXHR.getResponseHeader('content-type')}'!"
				console.log jqXHR.getAllResponseHeaders()



		fail = (jqXHR, textStatus, errorThrown) ->
			alert('Fail on loading items!\n\n' + jqXHR.responseText)
			console.error 'Fail on loading items:', textStatus.wrap()
			console.info jqXHR.getAllResponseHeaders()
			console.info jqXHR.responseText

		path = path or Path.path
		$.ajax
			url: "server.php",
			method: "GET",
			data:
				path: path
				noticer: 'index'
		.done done.bind(@)
		.fail fail.bind(@)

	@bindEvent: ->
		# listen to the event manager to reload items.
		EM.on('navigate', @loadItems.bind(@))

		renderSearch = (mess) ->
			@render(
				type: 'files and folders'
				files: mess.files,
				folders: mess.folders
				isSearch: true
				animate: false
			)

		EM.on('search', renderSearch.bind(@))

		normalRender = ->
			@render(
				type: 'files and folders'
				files: @files,
				folders: @folders
				animate: false
			)

		EM.on('empty-search', normalRender.bind(@))

		checkZoom = (e) ->
			if e.ctrlKey
				if e.originalEvent.deltaY < 0
					@zoom 'in'
				else
					@zoom 'out'
				e.preventDefault()


		$(document.body).bind('wheel', checkZoom.bind(@))

	@render: (kwargs={}) ->

		kwargs.animate = true if kwargs.animate == undefined


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
				fileData = { name: file, path: Path.join(file) }
				if kwargs.isSearch is true
					[isImage, htmlName] = val
					fileData.name = htmlName # letters are bolded
				else
					isImage = val

				if isImage # it is an image
					fileData.icon = fileData.path
				else
					fileData.icon = @getIconForFile(Path.extension(fileData.path))

				# hide files
				if any (globMatch(checker, file) for checker in CONFIG.hidden_files)
					fileData.isHidden = true
				else
					fileData.isHidden = false

				templateData.files.push(fileData)

			foldersIter = (folder, val) ->
				folderData = { name: folder, path: Path.join(folder) }
				if kwargs.isSearch is true
					[hasIndexOrExt, htmlName] = val
					folderData.name = htmlName # letters are bolded
				else
					hasIndexOrExt = val
				if typeof hasIndexOrExt == 'string'
					# it's the extension of the 'screenshot' file
					folderData.icon = Path.join(folder + '/screenshot.' + hasIndexOrExt)
				else if hasIndexOrExt
					folderData.icon = './img/folder-index.svg'
				else
					folderData.icon = './img/folder.svg'

				if any (globMatch(checker, folder) for checker in CONFIG.hidden_folders)
					folderData.isHidden = true
				else
					folderData.isHidden = false

				templateData.folders.push(folderData)

			if kwargs.files isnt null
				forEach(kwargs.files, filesIter.bind(@))
			if kwargs.folders isnt null
				forEach(kwargs.folders, foldersIter.bind(@))

			if kwargs.files is null and kwargs.folders is null
				console.log 'empty!'

		else if kwargs.type == 'code'
			if Path.extension() isnt 'txt'
				ext = Path.extension()
				if ext.indexOf('php') >= 0
					ext = 'html'
				if hljs.getLanguage(ext)
					obj = hljs.highlight(ext, kwargs.content)
					code = obj.value.replace(/\t/g, '    ')
					language = obj.language
				else
					code = kwargs.content
					language = 'unknown'
			else
				code = kwargs.content
				language = 'plain'
			templateData = { code: code, language: language }
		else if kwargs.type == 'image'
			return console.error 'No path for image!' if kwargs.path is undefined
			templateData = { path: kwargs.path }

		else
			console.error "Unknown type '#{kwargs.type}'! Impossible to render."


		html = Mustache.render(@templates[kwargs.type], templateData)

		if kwargs.animate == true
			totalAnimationTime = CONFIG.browsing_animation_total_time

			$newItems = @$items.clone()

			$newItems.html(html)

			showNewItems = (_this, $newItems) ->
				$newItems.animate(
					opacity: 1
					left: 10
					right: 0
				, totalAnimationTime / 2, ->
					_this.$items = $newItems
					EM.fire('items-var-changed', _this.$items)
				)

			$newItems.css(
				opacity: 0
				left: 50
				right: -50
			)
			_this = @

			@$items.after($newItems).animate(
				opacity: 0
				left: -50
				right: 50
			totalAnimationTime / 2, ->
				$(@).remove()
				showNewItems(_this, $newItems)
			)
		else
			@$items.html(html)



