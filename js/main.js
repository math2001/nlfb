var main;

$.fn.outerHTML = function(html) {
  if (html) {
    if (typeof html === typeof alert) {
      html = html.bind(this)();
    }
    return this.each(function() {
      return this.outerHTML = html;
    });
  } else {
    return this.outerHTML;
  }
};

$(document).ready(main = function() {
  var $sections, setHash, setPosFromHash;
  $sections = $('section');
  setHash = function(sectionNb, anchor) {
    var arr, current;
    current = location.hash.slice(1).split(',');
    if (sectionNb === null) {
      sectionNb = current[0];
    }
    arr = [sectionNb];
    if (anchor) {
      arr.push(anchor);
    }
    return location.hash = '#' + arr.join(',');
  };
  setPosFromHash = function() {
    var $anchor, $section, anchor, hash, i, j, len, ref, section, sectionNb;
    hash = location.hash.slice(1).split(',');
    sectionNb = hash[0], anchor = hash[1];
    ref = [parseInt(sectionNb) - 1, '#' + anchor], sectionNb = ref[0], anchor = ref[1];
    for (i = j = 0, len = $sections.length; j < len; i = ++j) {
      section = $sections[i];
      if (i < sectionNb) {
        $(section).attr('state', 'left');
      } else if (i === sectionNb) {
        $section = $(section).attr('state', 'center');
      } else {
        $(section).attr('state', 'right');
      }
    }
    if (anchor && ($anchor = $section.find(anchor)).length > 0) {
      return $section.animate({
        scrollTop: $anchor.offset().top
      }, 2000);
    }
  };
  if (location.hash) {
    setPosFromHash();
  }
  $(window).bind('hashchange', setPosFromHash);
  $('[scrollTo]').bind('click', function() {
    return setHash(null, $(this).attr('scrollTo').slice(1));
  });
  return $('.inserter').outerHTML(function() {
    return $(this.attr('data-template-id')).html();
  });
});
