global.jQuery = require( 'jquery' );

jQuery(function() {
  jQuery( '#from' ).autocomplete({
    source: function( req, res ) {
      jQuery.ajax({
        url: 'airports?q=' + req.term,
        success: function( matches ) {
          matches = JSON.parse( matches );
          console.log( matches );
          var formattedSuggestions = [];

          for ( var i = 0; i < matches.length; i++ ) {
            var match = matches[ i ];
            formattedSuggestions.push( match.cityName + ', ' + match.stateCode + ', ' + match.countryCode + ' (' + match.airportCode + ')' );
          }

          res( formattedSuggestions );
        }
      });
    }
  });
});