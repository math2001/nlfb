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

String::strip = (str, charToRemove=' ') ->
	start = 0
	end = str.length
	cont = true
	for char, i in str
		if cont == true and char == charToRemove
			start++
		else
			cont = false

	cont = true

	for char, i in str.split('').reverse()
		if cont == true and char == charToRemove
			end--
		else
			cont = false

	return str.slice(start, end)