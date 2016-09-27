var main;

$(document).ready(main = function() {
  var $section;
  $section = $('.section[data-nb="1"]');
  return $('#show-me-what-this-is').bind('click', function() {
    $section.attr('state', 'left');
    return $section = $(".section[data-nb='" + (parseInt($section.attr('data-nb')) + 1) + "']").attr('state', 'center');
  });
});
