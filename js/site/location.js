/*global Modernizr:false, ewf: false */

// Google API key: AIzaSyCgz5MUhOPerkL5AJl7u7dJnRrmKelzZJA

$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Success:
      show_map,
      // Failure:
      showDefaultMap()
    );
  }
  else {
    showDefaultMap();
  }

  function show_map(position) {
    var latlng, myOptions, map, marker;

    latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeControl: false,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
    marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"You are here! (at least within a " + position.coords.accuracy + " meter radius)"
    });

    $('.status').html('You are at ' + position.coords.latitude + ', ' + position.coords.longitude);
  }

  function showDefaultMap(msg) {
    if (!msg) {
      msg = '<p>Your device does not support geolocation, or you did not allow Go Responsive to know you location.</p>';
      if (ewf.iOS) {
        msg += '<p><a href="http://support.apple.com/kb/HT5467">How to enable location services for iPhone or iPad</a></p>';
      }
      else if (/Android/.test(navigator.userAgent)) {
        msg += '<p><a href="http://support.google.com/coordinate/bin/answer.py?hl=en&answer=2569281">How to enable location services for an Android device</a></p>';
      }
      else if (/Blackberry/.test(navigator.userAgent)) {
        msg += '<p><a href="http://docs.blackberry.com/en/developers/deliverables/17954/Turning_on_querying_Location_Services_1222726_11.jsp">How to enable location services for Blackberry</a></p>';
      }
    }
    $('.status').html(msg);
    // Show DTA office instead, using a fake `position` object
    show_map({coords:{latitude: 42.65163, longitude: -73.7595}});
  }

});
