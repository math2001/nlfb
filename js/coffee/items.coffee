class Items


	constructor: (@path, @em) ->
		@files = []
		@folders = []
		@$items = $('.items')
		@template = $('#items-template').html()

		@loadItems()

	loadItems: ->

		$.ajax
			url: "getitems.php",
			method: "GET",
			data: 
				path: Path.path
				noticer: 'index'
		.done @done.bind(@)
		.fail @fail

	


	render: (files, folders) ->

		data = {
			files: [],
			folders: [],
		}
		console.log files or @files
		for file in files or @files
			console.log file
			data.files.push(
				name: file
				path: Path.join(file)	
				icon: "./img/file_types/default.svg"
			)
		for folder in folders or @folders
			data.folders.push(
				name: folder,
				path: Path.join(folder)
				icon: './img/folder.svg'
			)

		console.log data
		@$items.html(Mustache.render(@template, data))
		
	done: (mess, textStatus, jqXHR) ->
		@files = mess.files
		@folders = mess.folders

		@render()