var markers;
(function() {
  "use strict";
  jQuery(function($) {
    var topo = L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}', {
      maxZoom: 16,
      attribution: '<a href="http://www.statkart.no/">Statens kartverk</a>'
    });
    var map = new L.Map('map', {layers: [topo], center: new L.LatLng(61.5, 9), zoom: 7 });
        
    markers = L.geoJson(null, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng);
      }
      
      ,onEachFeature: function(feature, layer) {
        
        
        var content = [
        '<h2>' + layer.feature.properties.title + '</h2>'
        ,'<p><strong>Hva: </strong> '+ layer.feature.properties.what +'</p>'
        ,'<p><strong>Hvor: </strong> '+ layer.feature.properties.where +'</p>'
        ,'<p><strong>Hvem: </strong> '+ layer.feature.properties.who +'</p>'
        ,'<p style="text-align:center">'
        ,'<a href="#" class="dnt-url">Les mer</a> '
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