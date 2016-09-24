class Items


	constructor: (em) ->
		@em = em # event manager
		@files = ['a test']
		@folders = ['folder1', 'folder2', '_nlfb']
		@$items = $('.items')
		@template = $('#items-template').html()
		@render()


	render: () ->

		data = {
			files: [],
			folders: [],
		}

		for file in @files
			data.files.push(
				name: file
				path: Path.join(file)	
				icon: "./img/file_types/default.svg"
			)
		for folder in @folders
			data.folders.push(
				name: folder,
				path: Path.join(folder)
				icon: './img/folder.svg'
			)
		@$items.html(Mustache.render(@template, data))
		
