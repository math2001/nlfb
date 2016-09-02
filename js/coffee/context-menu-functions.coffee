class CTX
	# Context Menu Functions

	@openInReal: (el) ->
		if el.nodeName.toLowerCase() == 'a'
			el = el.parentNode
		href = el.getAttribute('data-href')
		openInNewTab 'localhost', href

	@copyName: (el) ->
		if el.nodeName.toLowerCase() == 'li'
			$el = $(el).find('a')
		else
			$el = $(el)

		copy($el.text())

	@copyPath_: (el, forurl=false) ->
		if el.nodeName.toLowerCase() == 'a'
			el = el.parentNode
		if forurl == false
			return copy el.getAttribute('data-href')
		else 
			return copy encodeURIComponent(el.getAttribute('data-href')).replace(/%2F/g, '/')

	@copyPath : (key, opt, forurl=false) ->
		$trigger = opt.$trigger
		if $trigger.nodeName() == 'a'
			$trigger = $trigger.parent()

		path = new Path Config.get('localhost')
		path.go $trigger.attr('data-href').split('/')...
		if forurl
			path = encodeURI(path)
		copy path


	@copyPathForUrl: (key, opt) ->
		return CTX.copyPath(key, opt, true)

	@toogleShowHiddenFiles: ($menuitem) ->
		if window.$items.hasClass('hiding-files')
			window.$items.removeClass('hiding-files')
			$menuitem.text('Hide hidden items')
		else
			window.$items.addClass('hiding-files')
			$menuitem.text('Show hidden items')
		
manageContextMenu = ->
	$.contextMenu({
		selector: 'li[data-href]',
		items: {
			open: {
				name: "Open in real",
				accesskey: "r"
				callback: (key, opt) ->
					CTX.openInReal(opt.$trigger[0])
			}
			copy: {
				name: "Copy",
				accesskey: "c"
				items: {
					name: { 
						name: "Name",
						callback: (key, opt) ->
							CTX.copyName(opt.$trigger[0])
					}
					path: {
						name: "Path",
						callback: CTX.copyPath
					}
					pathForUrl: {
						name: "Path for url",
						callback: CTX.copyPathForUrl
					}
				}
			},
			sep1: "---------"
			hiddenFiles: {
				name: 'Toogle view hidden file',
				type: "checkbox"
			}
		}
	});