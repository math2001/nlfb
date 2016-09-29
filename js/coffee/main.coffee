
$.fn.outerHTML = (html) ->
	if html
		if typeof html == typeof alert
			html = html.bind(this)()
		this.each(->
			@outerHTML = html
		)
	else
		this.outerHTML


$(document).ready( main = ->

	$sections = $('section')

	setHash = (sectionNb, anchor) ->
		current = location.hash.slice(1).split(',')
		if sectionNb is null
			sectionNb = current[0]

		arr = [sectionNb]
		arr.push(anchor) if anchor
		location.hash = '#' + arr.join(',')

	setPosFromHash =  ->
		hash = location.hash.slice(1).split(',')
		[sectionNb, anchor] = hash
		[sectionNb, anchor] = [parseInt(sectionNb) - 1, '#' + anchor]

		for section, i in $sections
			if i < sectionNb
				$(section).attr('state', 'left')
			else if i == sectionNb
				$section = $(section).attr('state', 'center')
			else
				$(section).attr('state', 'right')

		if anchor and ($anchor = $section.find(anchor)).length > 0
			$section.animate(
				scrollTop: $anchor.offset().top
			, 2000)


	if location.hash
		setPosFromHash()


	$(window).bind('hashchange', setPosFromHash)


	$('[scrollTo]').bind('click', () ->
		setHash(null, $(this).attr('scrollTo').slice(1))
	)

	$('.inserter').outerHTML(->
		return $(this.attr('data-template-id')).html()
	)



)