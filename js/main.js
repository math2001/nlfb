var main;

$(document).ready(main = function() {
  var $section, scrollTo;
  $section = $('.section[data-nb="1"]');
  $('#show-me-what-this-is').bind('click', function() {
    $section.attr('state', 'left');
    return $section = $(".section[data-nb='" + (parseInt($section.attr('data-nb')) + 1) + "']").attr('state', 'center');
  });
  return $('[scrollTo]').bind('click', scrollTo = function() {
    var top;
    top = $($(this).attr('scrollTo')).offset().top;
    console.log('click', top);
    $section.animate({
      scrollTop: top
    }, 1000, function() {
      return console.log('done');
    });
    return false;
  });
});
