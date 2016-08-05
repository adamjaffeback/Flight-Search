var express = require('express');
var router = express.Router();
var thirdPartyHelpers = require( '../controllerHelpers/thirdPartyApiHelpers.js' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send();
});

router.get('/airlines', function( req, res ) {
  // Lists all available airlines from the Flight API.
  thirdPartyHelpers.callFlightApi( 'airlines' )
  .then(function( airlines ) {
    res.send( airlines );
  })
  .catch(function( error ) {
    res.status( 500 ).send( error );
  });
});

router.get('/airports', function( req, res, next ) {
  // Lists all matching airports from the Flight API.

  if ( Object.keys( req.query ).length ) {
    next();
  } else {
    res.status( 409 ).send( 'Please provide a city to search by as a querystring.' );
  }
 }, function( req, res ) {
  thirdPartyHelpers.callFlightApi( req.originalUrl )
  .then(function( airports ) {
    res.send( airports );
  })
  .catch(function( error ) {
    res.status( 500 ).send( error );
  });
 });

module.exports = router;
