(function() {
  'use strict';

  var sections = {};
  var i = 0;

  document.addEventListener('DOMContentLoaded', function(event) { 
    var section = document.querySelectorAll('.anchor');
    
    [].forEach.call(section, function(e) {
      sections[e.id] = e.offsetTop;
    });
  });

  window.addEventListener('scroll', throttle(callback, 200));

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

      console.log(el.nodeName)
      if (el.nodeName === 'LI') {
        console.log(el)
        el.setAttribute('class', theClass);
      }
    }
  };

  function callback() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var nav = document.querySelector('nav');

    for (i in sections) {
      if (sections[i] <= (scrollPosition + 100 )) {
        var previous = document.querySelector('nav .active');
        var current = document.querySelector('nav a[href="#' + i + '"]');
        
        if (current) {
          if (previous) {
            previous.setAttribute('class', ' ');
            setExpanded(previous, ' ');
         }
          //if ((current.offsetTop < nav.scrollTop) || (current.offsetTop > nav.scrollTop)) nav.scrollTop = current.offsetTop - 50;
          current.setAttribute('class', 'active');
          setExpanded(current, 'expanded');
        }
      }
    }
  };
})();
