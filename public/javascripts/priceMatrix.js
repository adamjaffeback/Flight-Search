var moment = require( 'moment-timezone' );
var $ = require( 'jquery' );
var flightHelper = require( './flights.js' );

var addEmptyTd = function( airlineCode ) {
  $( '#' + airlineCode ).append( '<td class="price">---</td>' );
};

var addPrice = function( airlineCode, price ) {
  $( '#' + airlineCode ).append( '<td class="price">$' + price.toFixed( 0 )+ '</td>' );
};

var addPrices = function( airlineCode, prices ) {
  for ( var i = 0; i < prices.length; i++ ) {
    var price = prices[ i ];
    if ( price === window.Infinity ) {
      addEmptyTd( airlineCode );
    } else {
      addPrice( airlineCode, price );
    }
  }
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
  var matrixData = {};
  var allFlights = [];

  var dayZero = moment( $( '#departureDate' ).val(), 'YYYY-MM-DD' ).subtract( 2, 'days' );
  dayZero.tz( JSON.parse( flightOptions[ 0 ] )[ 0 ].start.timeZone );
  var currentAirline = { name: null };

  var numberOfFlightOptions = flightOptions.length;
  for ( var i = 0; i < numberOfFlightOptions; i++ ) {
    var carrierFlightsForDay = JSON.parse( flightOptions[ i ] );

    if ( currentAirline.name !== carrierFlightsForDay[ 0 ].airline.name ) {
      if ( Array.isArray( matrixData[ currentAirline.name ] ) ) {
        addPrices( currentAirline.code, matrixData[ currentAirline.name ] );
      }
      currentAirline = carrierFlightsForDay[ 0 ].airline;
      // instantiate cheapest flights
      matrixData[ currentAirline.name ] = [ window.Infinity, window.Infinity, window.Infinity, window.Infinity, window.Infinity ];
      // new airline
      newAirlineRow( currentAirline.name, currentAirline.code );
    }

    var numberOfFlights = carrierFlightsForDay.length;
    for ( var j = 0; j < numberOfFlights; j++ ) {
      var flight = carrierFlightsForDay[ j ];
      var departureTime = moment( flight.start.dateTime ).tz( flight.start.timeZone );
      var index = departureTime.diff( dayZero, 'days' );

      if ( index >= 0 && index <= 4 ) {
        allFlights.push( flight );
      } else {
        continue;
      }

      if ( flight.price < matrixData[ flight.airline.name ][ index ] ) {
        matrixData[ flight.airline.name ][ index ] = flight.price;
      }
    }
  };

  // don't forget last airline
  addPrices( currentAirline.code, matrixData[ currentAirline.name ] );

  return allFlights;
};