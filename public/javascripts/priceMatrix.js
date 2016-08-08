var moment = require( 'moment' );
var $ = require( 'jquery' );

var addPrice = function( airlineCode, price ) {
  $( '#' + airlineCode ).append( '<td>$' + price + '</td>' );
};

var newAirlineRow = function( airlineName, airlineCode ) {
  return $( '<tr></tr>', { id: airlineCode } ).append( '<td>' + airlineName + '</td>' );
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
  var currentAirlines;

  // var numberOfFlightOptions = flightOptions.length;
  // for ( var i = 0; i < numberOfFlightOptions; i++ ) {
  //   var carrierFlightsForDay = flightOptions[ i ];

  //   if ( currentAirlines !== carrierFlightsForDay[ 0 ].airline.name ) {

  //   }
  //   console.log( JSON.parse( flightOptions[ i ] ) );
  // }
};