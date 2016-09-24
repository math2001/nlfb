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

Array::remove = (valToRemove, times=2) ->
	# remove <times> times `valToRemove` from this
	# if <times> == -1 then it removes all of them
	arr = []
	for val in this
		if times == 0 or val != valToRemove
			arr.push(val)
		else if val == valToRemove
			times -= 1
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



$.fn.exists = (nice=false) ->
	return this.length > 0
