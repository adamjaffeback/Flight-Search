var $ = require( 'jquery' );
var Pikaday = require( 'pikaday' );
var moment = require( 'moment' );
moment().format( 'YYYY-MM-DD' );
var priceMatrix = require( './priceMatrix.js' );
var flights = require( './flights.js' );

// handle form submission and subsequent dataType
$( document ).ready(function() {
  var options = {
    field: $( '#departureDate' )[ 0 ],
    format: 'YYYY-MM-DD'
  };

  var picker = new Pikaday( options );

  // intercept submit
  $( "#searchForm" ).submit(function( event ) {
    event.preventDefault();
    $( '#loading' ).show();
    $( 'button' ).prop( 'disabled', true );

    var from = $( '#from' ).val();
    $( '#from' ).val( from.toUpperCase() );
    var to = $( '#to' ).val();
    $( '#to' ).val( to.toUpperCase() );


    // send search to server
    $.ajax({
      url: 'search?' + $( '#searchForm' ).serialize(),
      type: 'get',
      dataType: 'json',
      success: function( data ) {
         // reset results page
        $( 'h3' ).show();
        $( '#priceMatrix' ).empty();
        $( '#cheapestFlight' ).empty();
        $( '#flights' ).empty();

        // slide search info up
        $( 'body' ).css( 'justify-content', 'flex-start' );

        priceMatrix.createDateHeaders();
        var allFlights = priceMatrix.createMatrix( data );

        flights.displayCheapestFlights( allFlights );
      },
      error: function() {
        $( '#loading' ).hide();
      },
      complete: function() {
        $( 'button' ).prop( 'disabled', false );
        $( '#loading' ).hide();
      }
    });

  });
});