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
    res.statusCode( 500 ).send( error );
  });
});

// router.get('/airports', function( req, res ) {
//   // Lists all matching airports from the Flight API.
//   thirdPartyHelpers.callFlightApi( 'airports' )
//   .then(function( airports ) {
//     res.send( airports );
//   })
//   .catch(function( error ) {
//     res.statusCode( 500 ).send( error );
//   });
// });

module.exports = router;
