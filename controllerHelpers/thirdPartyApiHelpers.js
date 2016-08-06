var request = require( 'request' );
var Q = require( 'q' );
var cache = require( './caches.js' );

var callFlightApi = function( endpoint ) {
  var deferred = Q.defer();

  var url = 'http://node.locomote.com/code-task/' + endpoint;

  request( url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      deferred.resolve( body );
    } else {
      deferred.reject( error );
    }
  });

  return deferred.promise;
};

var createFlightSearchUrl = function( airlineCode, from, to, date ) {
  return 'flight_search/' + airlineCode + '?date=' + date + '&from=' + from + '&to=' + to;
};

exports.getAirlines = function() {
  return callFlightApi( 'airlines' );
};

exports.getAirports = function( request ) {
  // if we already have the airports cached
  if ( cache.airports.hasOwnProperty( request.query.q ) ) {
    return Q( cache.airports[ request.query.q ] );
  } else {
    return callFlightApi( request.originalUrl )
    .then(function( airports ) {
      cache.airports[ request.query.q ] = airports;
      return airports;
    });
  }
};

exports.searchForFlight = function( from, to, date ) {
  return exports.getAirlines()
  .then(function( airlines ) {
    airlines = JSON.parse( airlines );
    // for each airline, make request for dates
    var requests = [];

    var numberOfAirlines = airlines.length;
    for ( var i = 0; i < numberOfAirlines; i++ ) {
      var airline = airlines[ i ];
      var url = createFlightSearchUrl( airline.code, from, to, date );
      requests.push( callFlightApi( url ) );
    }

    return Q.all( requests );
  });
};