var $ = require( 'jquery' );
var moment = require( 'moment' );

exports.addFlight = function( targetSelector, flight ) {
  // creates this:

  // <div class="flight">
  //   <div class="price">$400</div>
  //   <div class="airline">Airoflot</div>
  //   <div class="flightInfo">
  //     <div class="flightNumber">MH 234</div>
  //     <div class="flightTimes">4:00p -> 8:00a</div>
  //     <div class="flightDuration">2h 45mins</div>
  //   </div>
  // </div>

  var flightEl = $( '<p></p>', { class: 'flight' } );
  var newEl = $( '<span class="price">$' + flight.price.toFixed( 0 ) +  '</span>' );
  flightEl.append( newEl );
  newEl = $( '<span class="airline">' + flight.airline.name +  '</span>' );
  flightEl.append( newEl );
  newEl = $( '<span></span>', { class: 'flightInfo' } );
  newEl.append( $( '<span class="flightNumber">' +  flight.airline.code + ' ' + flight.flightNum + '</span>' ) );
  newEl.append( $( '<span class="flightTimes">' + moment( flight.start.dateTime ).format( 'h:mm a' ) + ' -> ' + moment( flight.finish.dateTime ).format( 'h:mm a' ) + '</span>' ) );
  newEl.append( $( '<span class="flightDuration">' + flight.durationMin + ' mins</span>' ) );
  flightEl.append( newEl );

  $( targetSelector ).append( flightEl );
};