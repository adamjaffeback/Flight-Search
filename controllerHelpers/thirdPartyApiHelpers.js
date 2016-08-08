var request = require( 'request' );
var Q = require( 'q' );
var cache = require( './caches.js' );
var moment = require( 'moment' );
moment().format();

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

var makeFlexibleDates = function( startDate ) {
  var date = moment( startDate, 'YYYY-MM-DD' );
  var flexibleDates = [ date.format( 'YYYY-MM-DD' ) ];
  // -1
  flexibleDates.unshift( date.clone().subtract( 1, 'days' ).format( 'YYYY-MM-DD' ) );
  // -2
  flexibleDates.unshift( date.clone().subtract( 2, 'days' ).format( 'YYYY-MM-DD' ) );
  // +1
  flexibleDates.push( date.clone().add( 1, 'days' ).format( 'YYYY-MM-DD' ) );
  // +2
  flexibleDates.push( date.clone().add( 2, 'days' ).format( 'YYYY-MM-DD' ) );

  return flexibleDates;
};

var makeAllSearchUrls = function( airlines, from, to, startDate ) {
  var dates = makeFlexibleDates( startDate );
  var searchUrls = [];

  var numberOfAirlines = airlines.length;
  for ( var i = 0; i < numberOfAirlines; i++ ) {
    var airlineCode = airlines[ i ].code;
    // -2 from date
    var url = createFlightSearchUrl( airlineCode, from, to, dates[ 0 ] );
    searchUrls.push( url );
    // -1 from date
    url = createFlightSearchUrl( airlineCode, from, to, dates[ 1 ] );
    searchUrls.push( url );
    // 0 (actual start date)
    url = createFlightSearchUrl( airlineCode, from, to, dates[ 2 ] );
    searchUrls.push( url );
    // +1 from date
    url = createFlightSearchUrl( airlineCode, from, to, dates[ 3 ] );
    searchUrls.push( url );
    // +2 from date
    url = createFlightSearchUrl( airlineCode, from, to, dates[ 4 ] );
    searchUrls.push( url );
  }

  return searchUrls;
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
    var searchUrls = makeAllSearchUrls( airlines, from, to, date );

    var numberOfSearchUrls = searchUrls.length;
    for ( var i = 0; i < numberOfSearchUrls; i++ ) {
      requests.push( callFlightApi( searchUrls[ i ] ) );
    }

    return Q.all( requests );
  });
};