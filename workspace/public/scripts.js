(function() {
  'use strict';

  var sections = {};
  var i = 0;
  var pagesLoaded = 1;

  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      getPages();
      initNav();
    }
  };

  window.addEventListener('scroll', throttle(updateNav, 200));

  function initNav() {
    // Update scroll
    var section = document.querySelectorAll('.anchor');
    
    sections['introduction'] = 0;

    [].forEach.call(section, function(e) {
      sections[e.id] = e.offsetTop;
    });

    updateNav();

    var scrollable = document.querySelector('nav');

    scrollable.addEventListener('wheel', function(event) {
      var deltaY = event.deltaY;
      var contentHeight = scrollable.scrollHeight;
      var visibleHeight = scrollable.offsetHeight;
      var scrollTop = scrollable.scrollTop;

      if (scrollTop === 0 && deltaY < 0)
        event.preventDefault();
      else if (visibleHeight + scrollTop === contentHeight && deltaY > 0)
        event.preventDefault();
    });
  };

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
      if (sections[i] <= (scrollPosition + 80)) {
        var previous = document.querySelector('nav .active');
        var current = document.querySelector('nav a[href="#' + i + '"]');
        
        if (current) {
          if (previous) {
            previous.setAttribute('class', ' ');
            setExpanded(previous, ' ');
          }

          //window.location.hash = i;

          if ((current.offsetTop <= nav.scrollTop) || (current.offsetTop >= nav.scrollTop)) nav.scrollTop = current.offsetTop - 50;
          current.setAttribute('class', 'active');
          setExpanded(current, 'expanded');
        }
      }
    }
  };

  function getPages() {
    NProgress.start();

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      // Reset nav
      initNav();

      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        if (xmlhttp.status == 200) {
          var results = JSON.parse(xmlhttp.responseText);

          appendHtml(document.getElementById('main'), results.main);
          appendHtml(document.getElementById('nav'), results.nav);

          if (window.location.hash.length) window.location.href = window.location.hash;

          pagesLoaded++;

          if (pagesLoaded < totalPages) {
            NProgress.inc();
            getPages();
          } else {      
            NProgress.done(true);
          }
        }
        else if (xmlhttp.status == 400) {
          pagesLoaded++;
        }
        else {
          pagesLoaded++;
        }
      }
    };

    xmlhttp.open('GET', '/ajax?page=' + (pagesLoaded + 1), true);
    xmlhttp.send();
  };

  function appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length) {
      el.appendChild(div.children[0]);
    }
  };

})();
