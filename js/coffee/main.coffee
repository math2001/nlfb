$(document).ready( main = ->

	$section = $ 'section[data-nb="1"]'

	$('.go-forward').bind('click', ->
		$section.attr('state', 'left')
		$section = $("section[data-nb='#{parseInt($section.attr('data-nb')) + 1}']").attr('state', 'center')
	)
	$('.go-backward').bind('click', ->
		$section.attr('state', 'right')
		$section = $("section[data-nb='#{parseInt($section.attr('data-nb')) - 1}']").attr('state', 'center')
	)

	$('[scrollTo]').bind('click', scrollTo = () ->
		top = $($(this).attr('scrollTo')).offset().top
		$section.animate({
			scrollTop: top
		}, 1000)
		return false
	)



)