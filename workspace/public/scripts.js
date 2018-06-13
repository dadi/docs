(function () {
  'use strict'

  var sections = {};
  var i = 0;

  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      initNav();

      var versionSelector = document.querySelector('#versions');
      if (versionSelector) {
        versionSelector.addEventListener('change', function (event) {
          window.location.href = event.target.options[event.target.selectedIndex].value;
        })
      }
    }
  }

  var timer = null;
  window.addEventListener('scroll', function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      updateNav();
    }, 100);
  }, false);

  var timer2 = null;
  window.addEventListener('resize', function () {
    if (timer2 !== null) {
      clearTimeout(timer2);
    }
    timer2 = setTimeout(function () {
      initNav();
    }, 100);
  }, false);

  function initNav () {
    // Update scroll
    var section = document.querySelectorAll('.anchor');

    sections['introduction'] = 0;

    [].forEach.call(section, function (elm) {
      var bodyRect = document.body.getBoundingClientRect();
      var elemRect = elm.getBoundingClientRect();
      var offset   = elemRect.top - bodyRect.top;

      sections[elm.id] = offset;
    })

    updateNav();
  };

  function throttle (fn, wait) {
    var time = Date.now();
    return function () {
      if ((time + wait - Date.now()) < 0) {
        setTimeout(fn, 200);
        time = Date.now();
      }
    }
  };

  function setExpanded (el, theClass) {
    while (el.parentNode) {
      el = el.parentNode;
      if (el.nodeName === 'LI') {
        el.setAttribute('class', theClass);
      }
    }
  };

  function updateNav () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    var nav = document.querySelector('nav');

    for (i in sections) {
      if (sections[i] <= (scrollPosition - 120)) {
        var previous = document.querySelector('nav .active');
        var current = document.querySelector('nav a[href="#' + i + '"]');
        
        if (current) {
          if (previous) {
            previous.setAttribute('class', ' ');
            setExpanded(previous, ' ');
          }

          if ((sections[i] <= nav.scrollTop) || (sections[i] >= nav.scrollTop)) nav.scrollTop = sections[i] - 50;

          current.setAttribute('class', 'active');
          setExpanded(current, 'expanded');
        }
      }
    }
  };
})()
