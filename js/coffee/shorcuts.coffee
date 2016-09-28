class Shorcuts

	@init: ->
		@bindEvents()

	@canRun: ->
		not Search.isFocus() and not Tools.isFocus()

	@bindEvents: ->
		checkForShortcuts = (e) ->
			if e.ctrlKey
				return true
			prevent = true
			if  @canRun() and e.keyCode == code('f')
				prevent = Search.run()
			else if @canRun() and e.keyCode == code('r')
				Tools.refresh()
			else if @canRun() and e.keyCode == code 'd'
				Tools.dirname()
			else if @canRun() and e.keyCode == code 'e'
				Tools.showEditPathPanel()
			else
				prevent = false

			e.preventDefault() if prevent
			return not prevent
			
		$(document.body).bind('keydown', checkForShortcuts.bind(@))