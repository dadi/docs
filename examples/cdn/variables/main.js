$(document).ready(function() {
  $('body').on('click', '.js-addprop', function(){
    createSelectBox();
  });
  
  $('body').on('click', '.js-killprop', function(){
    $(this).parent().remove();
    updateImage();
  });

  $('body').on('click', '.js-update', function(){
    updateImage();
  });

  $('body').on('click', '.sources a', function(){
    $('.source').addClass('hide');
    $($(this).attr('href')).removeClass('hide');
    $('.sources a').removeClass('active');
    $(this).addClass('active');

    return false;
  });

  function parseImage() {
    var startUrl = $('.image img').attr('src'),
        url = new URI(startUrl),
        path = url._parts.path.split('/'),
        hostname = url._parts.hostname,
        source = path.slice(0,-1).join('/').substring(1),
        file = path.pop(-1),
        query = URI.parseQuery(url._parts.query),
        queryLen = Object.keys(query).length,
        qs = '',
        i = 0;

    $('.settings li.active').remove();

    $.each(query, function(key, value){
      qs += '<span style="color:#fff">' + key + '</span>=<span style="color:#44BDEC">' + value + '</span>';
      if (i != (queryLen -1)) qs += '&'; i++;
    });

    $.each(query, function(key, value){
      createSelectBox(key, value);
    });

    $('.url').html(
      url._parts.protocol + '://' +
      '<span style="color:#ECB344">' + hostname  + '</span>/' +
      '<span style="color:#C969F5">' + source + '</span>/' +
      '<span style="color:#FF5252">' + file + '</span>?' +
      qs
    );

    $('#imgDomain').text(hostname);
    $('#imgSrc').text(source);
    $('#imgFile').text(file);
  }

  parseImage();

  function createSelectBox(key, value) {
    var $select, $new;

    // Create html
    $new = $('<li class="active">' + $('#addprop').html() + '</li>');
    $('.settings ul').append($new);

    // Set the key
    $new.find('.theKey').val(key);

    // Set the value
    $new.find('.theValue').val(value);

    $new.find('.theKey').on('change', function() {
      $new.find('.prop-type').addClass('hide');
      $new.find('.prop-type[data-type="'+this.value+'"]').removeClass('hide');
      $new.find('.theValue').focus();
    }).trigger('change');
  }

  function updateImage() {
    var uri = 'http://' + $('#imgDomain').text() + '/' + $('#imgSrc').text() + '/' + $('#imgFile').text(),
        url = new URI(uri);

    $('.spinner').removeClass('hide');

    $('.settings li.active').each(function() {
      var theKey = $(this).find('.theKey').val(),
          theValue = $(this).find('.prop-type').not('.hide').find('.theValue').val();

      url.addSearch(theKey, theValue);
    });

    $('.image img')
      .addClass('loading')
      .attr('src', url.toString())
      .one('load', function() {
        $('.spinner').addClass('hide');
        $(this).removeClass('loading')
      });

    parseImage();
  }
});