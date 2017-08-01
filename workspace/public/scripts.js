(function() {
  'use strict';

  var sections = {};
  var i = 0;

  document.addEventListener('DOMContentLoaded', function(event) { 
    var section = document.querySelectorAll('.anchor');
    
    [].forEach.call(section, function(e) {
      sections[e.id] = e.offsetTop;
    });

    updateNav();
  });

  window.addEventListener('scroll', throttle(updateNav, 200));

  function throttle(fn, wait) {
    var time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        setTimeout(fn, 200);
        time = Date.now();
      }
    }
  };

  function setExpanded(el, theClass) {
    while (el.parentNode) {
      el = el.parentNode;
      if (el.nodeName === 'LI') {
        el.setAttribute('class', theClass);
      }
    }
  };

  function updateNav() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var nav = document.querySelector('nav');

    for (i in sections) {
      if (sections[i] <= (scrollPosition + 50 )) {
        var previous = document.querySelector('nav .active');
        var current = document.querySelector('nav a[href="#' + i + '"]');
        
        if (current) {
          if (previous) {
            previous.setAttribute('class', ' ');
            setExpanded(previous, ' ');
          }

          //window.location.hash = i;

          if ((current.offsetTop < nav.scrollTop) || (current.offsetTop > nav.scrollTop)) nav.scrollTop = current.offsetTop - 50;
          current.setAttribute('class', 'active');
          setExpanded(current, 'expanded');
        }
      }
    }
  };
})();
