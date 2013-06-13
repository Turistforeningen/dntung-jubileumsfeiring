var markers;
(function() {
  "use strict";
  jQuery(function($) {
		var topo = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
			key: 'BC9A493B41014CAABB98F0471D759707'
		});    
    var map = new L.Map('map', {layers: [topo], center: new L.LatLng(61.5, 9), zoom: 6 });
        
    markers = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: 'img/logo.png'
            /* ,iconRetinaUrl: 'img/1-3@2x.png' */
            ,iconSize: [50, 50]
            ,iconAnchor: [25, 50]
            ,popupAnchor: [0, -25]
          })
        });
      }
      
      ,onEachFeature: function(feature, layer) {
        
        var content = [
        '<h2>' + layer.feature.properties.title + '</h2>'
        ,'<p><strong>Hva: </strong> ' + layer.feature.properties.what + '</p>'
        ,'<p><strong>Hvor: </strong> ' + layer.feature.properties.where + '</p>'
        ,'<p><strong>Hvem: </strong> ' + layer.feature.properties.who + '</p>'
        ,'<p style="text-align:center">'
        ,'<a target="_blank" href="' + layer.feature.properties.url + '" class="dnt-url">Les mer</a> '
        ,'</p>'
        ].join('');
        
        layer.bindPopup(content, {className: 'act-popup'});
        
        return true;
      }
    }).addTo(map);
    
    // Add activites
    for(var i = 0; i < activities.length; i++) {
      markers.addData(activities[i]);
    }
    
  });    
}).call(this);
