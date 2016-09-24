forEach = (obj, func) ->
	# function (key, value, obj, nb_key) { /* do stuff */ }
	keys = Object.keys(obj);

	for key, i in keys
		func(key, obj[key], obj, i)
		
	return obj

Array::__update = (arr) ->
	# this = arr
	while this.length > 0
		this.pop()

	for val in arr
		this.push(val)
	this

Array::remove = (valToRemove) ->
	# remove all `valToRemove` from this
	arr = []
	for val in this
		if val != valToRemove
			arr.push(val)
	this.__update(arr)

Array::get = (index) ->
	index = this.length + index if index < 0
	this[index]

String::strip = (charToRemove=' ') ->
	start = 0
	end = @length
	cont = true
	for char, i in @
		if cont == true and char == charToRemove
			start++
		else
			cont = false

	cont = true

	for char, i in @split('').reverse()
		if cont == true and char == charToRemove
			end--
		else
			cont = false

	return @slice(start, end)
String::wrap = (char='"') ->
	return char + this + char