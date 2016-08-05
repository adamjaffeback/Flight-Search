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