$(document).ready(function() {
  $('body').on('click', '.js-addprop', function(){
    // Create html
    $new = $('<li>' + $('#addprop').html() + '</li>');
    $('.settings ul').append($new);

    // Create selectize
    $select = $new.find('select').selectize({
      maxItems: 1,
      onInitialize: function() {
        $select.focus();
      }
    });
  });
  
  $('body').on('click', '.js-killprop', function(){
    var $prop = $(this).parent();

    $prop.remove();

    // function to update image
  });

  // Selectize
  /*var xhr;
  var select_state, $select_state;
  var select_city, $select_city;

  $select_state = $('#select-state').selectize({
    onChange: function(value) {
      if (!value.length) return;
      select_city.disable();
      select_city.clearOptions();
      select_city.load(function(callback) {
        xhr && xhr.abort();
        xhr = $.ajax({
          url: './options/' + value + '.json',
          success: function(results) {
            select_city.enable();
            callback(results);
          },
          error: function() {
            callback();
          }
        })
      });
    }
  });

  $select_city = $('#select-city').selectize({
    valueField: 'name',
    labelField: 'name',
    searchField: ['name']
  });

  select_city  = $select_city[0].selectize;
  select_state = $select_state[0].selectize;

  select_city.disable();*/

});