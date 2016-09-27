var main;

$(document).ready(main = function() {
  var $section, scrollTo;
  $section = $('section[data-nb="1"]');
  $('.go-forward').bind('click', function() {
    $section.attr('state', 'left');
    return $section = $("section[data-nb='" + (parseInt($section.attr('data-nb')) + 1) + "']").attr('state', 'center');
  });
  $('.go-backward').bind('click', function() {
    $section.attr('state', 'right');
    return $section = $("section[data-nb='" + (parseInt($section.attr('data-nb')) - 1) + "']").attr('state', 'center');
  });
  return $('[scrollTo]').bind('click', scrollTo = function() {
    var top;
    top = $($(this).attr('scrollTo')).offset().top;
    $section.animate({
      scrollTop: top
    }, 1000);
    return false;
  });
});
