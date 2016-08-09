var moment = require( 'moment' );
var $ = require( 'jquery' );
var flightHelper = require( './flights.js' );

var addPrice = function( airlineCode, price ) {
  $( '#' + airlineCode ).append( '<td class="price">$' + price + '</td>' );
};

var newAirlineRow = function( airlineName, airlineCode ) {
  var newRow = $( '<tr></tr>', { id: airlineCode } ).append( '<td class="airline">' + airlineName + '</td>' );
  $( '#priceMatrix' ).append( newRow );
};

var addHeader = function( date ) {
  date = date || '';
  $( '#dates' ).append( '<th>' + date + '</th>' );
};

exports.createDateHeaders = function() {
  $( '<tr></tr>', { id: 'dates' } ).appendTo( '#priceMatrix' );
  // blank for carriers
  addHeader();

  var startDate = $( '#departureDate' ).val();
  startDate = moment( startDate, 'YYYY-MM-DD' );

  var flexibleDate = startDate.clone().subtract( 2, 'days' ).format( 'D/M' );
  addHeader( flexibleDate );

  flexibleDate = startDate.clone().subtract( 1, 'days' ).format( 'D/M' );
  addHeader( flexibleDate );

  flexibleDate = startDate.clone().format( 'D/M' );
  addHeader( flexibleDate );

  flexibleDate = startDate.clone().add( 1, 'days' ).format( 'D/M' );
  addHeader( flexibleDate );

  flexibleDate = startDate.clone().add( 2, 'days' ).format( 'D/M' );
  addHeader( flexibleDate );
};

exports.createMatrix = function( flightOptions ) {
  var currentAirlines = { name: null };
  var allFlights = [];

  var numberOfFlightOptions = flightOptions.length;
  for ( var i = 0; i < numberOfFlightOptions; i++ ) {
    var carrierFlightsForDay = JSON.parse( flightOptions[ i ] );

    if ( currentAirlines.name !== carrierFlightsForDay[ 0 ].airline.name ) {
      currentAirlines = carrierFlightsForDay[ 0 ].airline;
      // new airline
      newAirlineRow( currentAirlines.name, currentAirlines.code );
    }

    var cheapestFlight = { price: window.Infinity };
    var numberOfFlights = carrierFlightsForDay.length;
    for ( var j = 0; j < numberOfFlights; j++ ) {
      var flight = carrierFlightsForDay[ j ];

      allFlights.push( flight );

      if ( flight.price < cheapestFlight.price ) {
        cheapestFlight = flight;
      }
    }

    addPrice( currentAirlines.code, cheapestFlight.price.toFixed( 0 ) );
  };

  return allFlights;
};