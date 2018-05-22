(function () {
  'use strict'

  var sections = {}
  var i = 0
  var pagesLoaded = 1

  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      // getPages();
      initNav()

      var versionSelector = document.querySelector('#versions')
      versionSelector.addEventListener('change', function (event) {
        window.location.href = event.target.options[event.target.selectedIndex].value
      })
    }
  }

  var timer = null
  window.addEventListener('scroll', function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      updateNav()
    }, 500)
  }, false)

  function initNav () {
    // Update scroll
    var section = document.querySelectorAll('.anchor')

    sections['introduction'] = 0;

    [].forEach.call(section, function (e) {
      sections[e.id] = e.offsetTop
    })

    updateNav();

    var scrollable = document.querySelector('nav');

    scrollable.addEventListener('wheel', function (event) {
      var deltaY = event.deltaY;
      var contentHeight = scrollable.scrollHeight;
      var visibleHeight = scrollable.offsetHeight;
      var scrollTop = scrollable.scrollTop;

      if (scrollTop === 0 && deltaY < 0) { event.preventDefault() } else if (visibleHeight + scrollTop === contentHeight && deltaY > 0) { event.preventDefault(); }
    })
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
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
    var nav = document.querySelector('nav');

    for (i in sections) {
      if (sections[i] <= (scrollPosition + 80)) {
        var previous = document.querySelector('nav .active');
        var current = document.querySelector('nav a[href="#' + i + '"]');

        if (current) {
          if (previous) {
            previous.setAttribute('class', ' ');
            setExpanded(previous, ' ');
          }

          if ((current.offsetTop <= nav.scrollTop) || (current.offsetTop >= nav.scrollTop)) nav.scrollTop = current.offsetTop - 50
          current.setAttribute('class', 'active');
          setExpanded(current, 'expanded');
        }
      }
    }
  };
})()
