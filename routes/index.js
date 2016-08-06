var express = require('express');
var router = express.Router();
var thirdPartyHelpers = require( '../controllerHelpers/thirdPartyApiHelpers.js' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send();
});

router.get('/airlines', function( req, res ) {
  // Lists all available airlines from the Flight API.
  thirdPartyHelpers.getAirlines()
  .then(function( airlines ) {
    res.send( airlines );
  })
  .catch(function( error ) {
    next( error );
  });
});

router.get('/airports', function( req, res, next ) {
  // Lists all matching airports from the Flight API.
  if ( req.query.q ) {
    next();
  } else {
    var err = new Error( 'Please provide a city to search by as a querystring.' );
    err.status = 409;
    next( err );
  }
 }, function( req, res, next ) {
  thirdPartyHelpers.getAirports( req )
  .then(function( airports ) {
    res.send( airports );
  })
  .catch(function( error ) {
    next( error );
  });
});

router.get('/search', function( req, res, next ) {
  // Performs a flight search with to, from, and date

  if ( req.query.to && req.query.from && req.query.date ) {
    next();
  } else {
    var err = new Error( 'Please provide all fields (to, from, date) to the querystring.' );
    err.status = 409;
    next( err );
  }
 }, function( req, res ) {
  thirdPartyHelpers.searchForFlight( req.query.from, req.query.to, req.query.date )
  .then(function( matchingFlights ) {
    res.send( matchingFlights );
  })
  .catch(function( error ) {
    next( error );
  });
});

module.exports = router;
