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

  var flightEl = $( '<div></div>', { class: 'flight' } );
  var newEl = $( '<div class="price">$' + flight.price.toFixed( 0 ) +  '</div>' );
  flightEl.append( newEl );
  newEl = $( '<div class="airline">' + flight.airline.name +  '</div>' );
  flightEl.append( newEl );
  newEl = $( '<div></div>', { class: 'flightInfo' } );
  newEl.append( $( '<div class="flightNumber">' +  flight.airline.code + ' ' + flight.flightNum + '</div>' ) );
  newEl.append( $( '<div class="flightTimes">' + moment( flight.start.dateTime ).format( 'h:mm a' ) + ' -> ' + moment( flight.finish.dateTime ).format( 'h:mm a' ) + '</div>' ) );
  newEl.append( $( '<div class="flightDuration">' + flight.durationMin + ' mins</div>' ) );
  flightEl.append( newEl );

  $( targetSelector ).append( flightEl );
};