class CMF
	# Context Menu Function
	@_default: ->
		return window.lastContextMenuFromElement

	@openFromDataHref: () ->
		el = CMF._default()
		if el.nodeName.toLowerCase() == 'a'
			el = el.parentNode
		href = el.getAttribute('data-href')
		openInNewTab 'localhost', href

	@copyName: () ->
		el = CMF._default()
		if el.nodeName.toLowerCase() == 'li'
			$el = $(el).find('a')
		else
			$el = $(el)

		copy($el.text())

	@copyPath: (forurl=false) ->
		el = CMF._default()
		if el.nodeName.toLowerCase() == 'a'
			el = el.parentNode
		if forurl == false
			return copy el.getAttribute('data-href')
		else 
			return copy encodeURIComponent(el.getAttribute('data-href')).replace(/%2F/g, '/')
		