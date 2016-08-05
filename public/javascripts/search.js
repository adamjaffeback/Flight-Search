var $ = require( 'jquery' );
var Pikaday = require( 'pikaday' );

$( document ).ready(function() {
  var options = {
    field: $( '#departureDate' )[ 0 ],
    format: 'D MMM YYYY'
  };

  var picker = new Pikaday( options );
});