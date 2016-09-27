$(document).ready( main = ->

	$section = $ '.section[data-nb="1"]'

	$('#show-me-what-this-is').bind('click', ->
		$section.attr('state', 'left')
		$section = $(".section[data-nb='#{parseInt($section.attr('data-nb')) + 1}']").attr('state', 'center')
	)

	$('[scrollTo]').bind('click', scrollTo = () ->
		top = $($(this).attr('scrollTo')).offset().top
		console.log 'click', top
		$section.animate({
			scrollTop: top
		}, 1000, ->
			console.log 'done'
		);
		return false
	)



)