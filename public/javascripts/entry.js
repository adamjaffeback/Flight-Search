global.jQuery = require( 'jquery' );

jQuery(function() {
  jQuery( '#from' ).autocomplete({
    source: [ 'Adam', 'Andrew', 'Michael' ]
  });
});