class ModalsManager

	constructor: ->
		$simple = $('#simple-message')
		@_simple = 
			modal: $simple
			fader: $simple.parent()
			header: $simple.find('h3')
			body: $simple.find('.mbody')
		@_simple.fader.hide()

		window.$document.on('click', '.modal .close', ->
			$(this).parentsUntil('.mfade').last().parent().fadeOut()
		)


	simple: (header, message, type=null, time=400) ->
		@_simple.modal.attr('data-type', type)
		@_simple.header.text(header).append('<span class="close">&times;</span>')
		@_simple.body.html message
		@_simple.fader.fadeIn(time)

test = ->
	window.$document = $ document

	modals = new ModalsManager()

	modals.simple('404 - Path unexisting', 'This path does not exists, impossible to ...')
