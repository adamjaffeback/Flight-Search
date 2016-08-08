var $ = require( 'jquery' );
var Pikaday = require( 'pikaday' );
var moment = require( 'moment' );
moment().format( 'YYYY-MM-DD' );
var priceMatrix = require( './priceMatrix.js' );


$( document ).ready(function() {
  var options = {
    field: $( '#departureDate' )[ 0 ],
    format: 'YYYY-MM-DD'
  };

  var picker = new Pikaday( options );

  // intercept submit
  $( "#searchForm" ).submit(function( event ) {
    event.preventDefault();

    $.ajax({
      url: 'search?' + $( '#searchForm' ).serialize(),
      type: 'get',
      dataType: 'json',
      success: function( data ) {
        priceMatrix.createDateHeaders();
        priceMatrix.createMatrix( data );
      }
    });

    $( 'body' ).css( 'justify-content', 'flex-start' );

  });
});