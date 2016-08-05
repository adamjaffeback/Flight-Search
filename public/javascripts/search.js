var $ = require( 'jquery' );
var Pikaday = require( 'pikaday' );
var moment = require( 'moment' );
moment().format( 'YYYY-MM-DD' );

$( document ).ready(function() {
  var options = {
    field: $( '#departureDate' )[ 0 ],
    format: 'YYYY MM DD'
  };

  var picker = new Pikaday( options );
});