var request = require( 'request' );
var Q = require( 'q' );

exports.callFlightApi = function( endpoint ) {
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