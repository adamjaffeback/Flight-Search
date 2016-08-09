var $ = require( 'jquery' );
var Pikaday = require( 'pikaday' );
var moment = require( 'moment' );
moment().format( 'YYYY-MM-DD' );
var priceMatrix = require( './priceMatrix.js' );
var flights = require( './flights.js' );

$( document ).ready(function() {
  var options = {
    field: $( '#departureDate' )[ 0 ],
    format: 'YYYY-MM-DD'
  };

  var picker = new Pikaday( options );

  // intercept submit
  $( "#searchForm" ).submit(function( event ) {
    event.preventDefault();
    $( '#loading' ).toggle();

    // send search to server
    $.ajax({
      url: 'search?' + $( '#searchForm' ).serialize(),
      type: 'get',
      dataType: 'json',
      success: function( data ) {
        $( '#loading' ).toggle();
        // slide search info up
        $( 'body' ).css( 'justify-content', 'flex-start' );
        // fade-in headers
        $( 'h3').toggle();


        priceMatrix.createDateHeaders();
        var allFlights = priceMatrix.createMatrix( data );

        flights.displayCheapestFlights( allFlights );
      }
    });

  });
});