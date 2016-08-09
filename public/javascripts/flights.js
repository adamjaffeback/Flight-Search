var $ = require( 'jquery' );
var moment = require( 'moment' );

exports.addFlight = function( targetSelector, flight ) {
  var flightEl = $( '<p></p>', { class: 'flight' } );
  var newEl = $( '<span class="price">$' + flight.price.toFixed( 0 ) +  '</span>' );
  flightEl.append( newEl );
  newEl = $( '<span class="airline">' + flight.airline.name +  '</span>' + '<span class="flightDate">' +  moment( flight.start.dateTime ).format( 'D MMM' ) + '</span>' );
  flightEl.append( newEl );
  newEl = $( '<span></span>', { class: 'flightInfo' } );
  newEl.append( $( '<span class="flightNumber">' +  flight.airline.code + ' ' + flight.flightNum + '</span>' ) );
  newEl.append( $( '<span class="flightTimes">' + moment( flight.start.dateTime ).format( 'h:mm a' ) + ' -> ' + moment( flight.finish.dateTime ).format( 'h:mm a' ) + '</span>' ) );
  newEl.append( $( '<span class="flightDuration">' + flight.durationMin + ' mins</span>' ) );
  flightEl.append( newEl );

  $( targetSelector ).append( flightEl );
};

exports.displayCheapestFlights = function( allFlights ) {
  var numberOfFlightsAdded = 0;
  var cheapestFlightFound = false;
  var originalDateSelection = $( '#departureDate' ).val();
  originalDateSelection = moment( originalDateSelection, 'YYYY-MM-DD' );

  allFlights.sort(function( a, b ) {
    return a.price - b.price ;
  });

  // loop through ordered flights
  var numberOfFlights = allFlights.length;
  for ( var i = 0; i < numberOfFlights; i++ ) {
    var flight = allFlights[ i ];

    // if there are less than ten flights on the page
    if ( numberOfFlightsAdded < 10) {
      exports.addFlight( '#flights', flight );
      numberOfFlightsAdded++;

    // more than 10 flights on page and cheapest found
    } else if ( cheapestFlightFound ) {
      // done
      break;
    }

    // look for the cheapest flight for the original selection
    if ( !cheapestFlightFound && moment( flight.start.dateTime ).isSame( originalDateSelection, 'day' ) ) {
      exports.addFlight( '#cheapestFlight', flight );
      cheapestFlightFound = true;
    }
  }
};