global.jQuery = require( 'jquery' );

var formatDropdownSuggestions = function( rawMatches ) {
  rawMatches = JSON.parse( rawMatches );
  var formattedSuggestions = [];

  for ( var i = 0; i < rawMatches.length; i++ ) {
    var match = rawMatches[ i ];
    formattedSuggestions.push( match.cityName + ', ' + match.stateCode + ', ' + match.countryCode + ' (' + match.airportCode + ')' );
  }

  return formattedSuggestions;
};

var attachAutocomplete = function( targetEl ) {
  jQuery( targetEl ).autocomplete({
    source: function( req, res ) {
      jQuery.ajax({
        url: 'airports?q=' + req.term,
        success: function( matches ) {
          res( formatDropdownSuggestions( matches ) );
        }
      });
    },
    select: function( event, ui ) {
      event.preventDefault();
      jQuery( targetEl ).val( ui.item.value.slice( -4, -1 ) );
    }
  });
};

jQuery(function() {
  attachAutocomplete( '#from' );
  attachAutocomplete( '#to' );
});