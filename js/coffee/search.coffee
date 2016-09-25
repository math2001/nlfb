class Search

	# WARNING: research is for now case sensitive

	@init: (@em, @path) ->
		@$el = $('#search')
		@bindEvents()
		@bindDOM()

	@advancedResearch: (pattern, arr) ->

		# <pattern> to search in <arr>

		# return arr if pattern == '.'

		match = (text, pattern) ->
			lastIndex = -1
			indexes = []

			for letter in pattern
				index = text.indexOf(letter, lastIndex + 1)
				return false if index == -1

				lastIndex = index
				indexes.push(index)
			return indexes
			

		highlightLetters = (word, indexes) ->
			newWord = ''
			for letter, i in word
				if indexes.indexOf(i) != -1
					newWord += "<b>#{letter}</b>"
				else
					newWord += letter
			return newWord

		results = {}

		for el in arr
			indexes = match(el, pattern)
			if indexes != false
				results[el] = highlightLetters(el, indexes)

		return results # type: Obj: { realName: highlightedName }

	@bindEvents: ->
		getItems = (mess) ->
			@files = mess.files
			@folders = mess.folders

		@em.on('got-items', getItems.bind(@))

	@bindDOM: ->

		addValue = (obj1, obj2) ->
			# obj1 = { key: val1 }
			# obj2 = { key: val2 }
			# obj  = { key: [val1, val2] }
			obj = {}
			add = (key, val) ->
				if not obj2[key]
					return null
				val = [val]
				val.push(obj2[key])
				obj[key] = val

			forEach(obj1, add)
			return obj

		search = (e) ->
			if (pattern = $(@).val()) == ''
				e.data.this.em.fire('empty-search', null)
				return false

			if e.data.this.	files != null
				selectedFiles = e.data.this.advancedResearch(pattern, Object.keys(e.data.this.files))
				selectedFiles = addValue(e.data.this.files, selectedFiles)
			else
				selectedFiles = {}

			if e.data.this.folders != null
				selectedFolders = e.data.this.advancedResearch(pattern, Object.keys(e.data.this.folders))
				selectedFolders = addValue(e.data.this.folders, selectedFolders)
			else
				selectedFolders = {}

			###
				selectedFiles = {
					name: [isImage, htmlName],
					name: [isImage, htmlName],
				}
				selectedFolders = {
					name: [hasIndex, htmlName],
					name: [hasIndex, htmlName],
				}
			###
			e.data.this.em.fire('search', { files: selectedFiles, folders: selectedFolders })

		@$el.bind('input', { "this": @ }, search)