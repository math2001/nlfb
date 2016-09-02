len = (el) ->
	if el.length != undefined
		return el.length
	else
		console.error "length of \"#{el}\" is undefined!"
	return 0

die = (msg='die') ->
	throw new Error(msg)

int   = (el) -> parseInt(el)
float = (el) -> parseFloat(el)
str   = (el) -> '' + el
list  = (el) -> (e for e in el)
arr   = (el) -> list(el)

say = -> alert(list(arguments).join(' '));


array_diff = (arr1, arr2) ->
	arr = []
	for el in arr1
		arr.push(el) if arr2.indexOf(el) == -1
	arr

code = (letter) ->
	return 17 if letter == 'ctrl'
	return 18 if letter == 'alt'
	return 27 if letter == 'escape'
	return 13 if letter in ['enter', 'return']

	if len(letter) != 1
		return console.error "code: unknow abrv '#{letter}'"

	return letter.charCodeAt(0) - 32

quote = (str) -> "\"#{str}\""

forEach = (obj, func) ->
	# function (key, value, obj, nb_key) { /* do stuff */ }
	keys = Object.keys(obj);

	for key, i in keys
		func(key, obj[key], obj, i)
	
	return obj

extend = (obj1, obj2) ->
	obj = {}
	keys1 = Object.keys(obj1)
	keys2 = Object.keys(obj2)
	for key in keys1
		obj[key] = obj1[key]

	for key in keys2
		obj[key] = obj2[key]

	obj

add = (arr1, arr2) ->
	for el in arr2
		arr1.push(el)
	return arr1
	
trim = (str, charToRemove=' ') ->
	start = 0
	end = len(str)
	cont = true
	for char, i in str
		if cont == true and char == charToRemove
			start++
		else
			cont = false

	cont = true

	for char, i in list(str).reverse()
		if cont == true and char == charToRemove
			end--
		else
			cont = false

	return str.slice(start, end)

moveUp = (path=location.hash) ->
	path = path.split('/')
	path.slice(0, -1).join('/')

getPath = (invalidPath) ->
	path = location.hash
	path = path.slice(1, len(path)) if path[0] == '#'
	path = trim(path, '/')

	path = path + '/' + invalidPath if invalidPath != undefined

	path = '.' if path == ''
	path.replace(/<\/?[^>]+(>|$)/g, ""); # remove any tag

extract = (obj, objToSave=false) ->
	isValid = (varName) ->
		return /[a-zA-Z_][a-zA-Z0-9_]+/.test(varName)
		
	for key in Object.keys(obj)
		if isValid(key)
			eval("var #{key} = obj[key]")
		
		if objToSave
			objToSave[key] = obj[key]

	null

startWith = (str, word, type='any') ->
	tested = str.slice(0, len(word))
	if typeof word == typeof 'str'
		return tested == word

	if typeof word != typeof ['foo']
		for w in word
			if type == 'all' and tested != word
				return false
			if type == 'any' and tested == word
				return true

		if type == 'all'
			return true
		else
			return false

openInNewTab = (url...) ->
	if $.isArray(url)
		url = url.join('/')
	if not startWith(url, ['http://', 'https', 'file://'])
		url = 'http://' + url
	$("<a>").attr("href", url).attr("target", "_blank")[0].click();

copy = (str) ->
	$input = $('<input type="text" />')
		.val(str)
		.appendTo($('body'))
		.css({
			position: 'absolute',
			top: '50%'
			left: '50%'
			transform: 'translate(-50%, -50%)',
			'z-index': 5000
		}).select()
	if not document.execCommand('copy')
		console.warn 'unnable to copy "' + str + '"!'
		
	$input.remove()
	return str

pathJoin = (paths...) ->
	final = []
	sep = '/'
	for path in paths
		if not $.isString(path)
			return console.error "pathJoin: Can only join string and not #{typeof path}"
		p = trim(path, '/')
		final.push p if p != ''
	final.join(sep)

# ------------------------------- #
# ------------ proto ------------ #
# ------------------------------- #

String::strip = (char='/') ->
	trim(this, char)

Array::remove = (el) ->
	arr = []
	for e in this
		if e != el
			arr.push el
	for i in [0..this.length]
		arr.pop()
	for el in arr
		arr.push(el)
	
Array::get = (index) ->
	if index < 0
		index = len(this) + index # cause index is negative: - + - = +
	return this[index]

# --------------------------------------- #
# ------------ Jquery plugin ------------ #
# --------------------------------------- #

$.fn.addClasses = ->
	for arg in arguments
		this.addClass(arg)
	return this

$.fn.isEmpty = ->
	return len(this) == 0

$.fn.nodeName = ->
	if len(this) > 1
		return console.error 'nodeName: More than on node to return! Just impossible'
	if this.isEmpty()
		return console.error 'nodeName: No elements!'

	return this[0].nodeName.toLowerCase()

$.isString = (el) ->
	return typeof el == 'string'

# ------------------------------- #
# ------------ Tools ------------ #
# ------------------------------- #

class Path
	constructor: (@path='/') ->

	moveUp: ->
		@path = @path.strip('/').split('/').slice(0, -1).join('/')
		@

	go: (path...) ->
		@path = pathJoin(@path, path...)
		@

	toString: ->
		@path
	
	abs: ->
		'http://' + pathJoin(Config.get('localhost'), @path)


getFileType = (filename, real=true) -> 
	extension = filename.split('.').get(-1)
	return extension if real
	switch extension
		when 'gitignore', 'gitattributes'
			return 'git'
	extension
