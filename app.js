var markers;

changePopup = function(markerOld, markerNew) {
  alert(markerOld);
};

(function() {
  "use strict";
  jQuery(function($) {
    var topo = L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}', {
      maxZoom: 16,
      attribution: '<a href="http://www.statkart.no/">Statens kartverk</a>'
    });    
    var map = new L.Map('map', {layers: [topo], center: new L.LatLng(61.5, 9), zoom: 6 });
        
    markers = L.geoJson(null, {
      // Create Markers
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
      
      // Do the popup
      ,onEachFeature: function(feature, layer) {
        
        var content, getContent;
        
        getContent = function(prop) {
          return [
          '<h2>' + prop.title + '</h2>'
          ,'<p class="what"><strong>Hva: </strong> ' + prop.what + '</p>'
          ,'<p class="where"><strong>Hvor: </strong> ' + prop.where + '</p>'
          ,'<p class="who"><strong>Hvem: </strong> ' + prop.who + '</p>'
          ,'<p style="text-align:center">'
          ,'<a target="_blank" class="url" href="' + prop.url + '" class="dnt-url">Les mer</a> '
          ,'</p>'
          ].join('');
        };
        
        if (typeof layer.feature.properties.title !== 'undefined') {
          content = getContent(layer.feature.properties);
        } else {
          content = '';
          for (var i = 0; i < layer.feature.properties.length; i++) {
            content += getContent(layer.feature.properties[i]);
          }
        }
        layer.bindPopup(content, {className: 'act-popup'});
        
        return true;
      }
    }).addTo(map);
    
    // Add activites
    for(var i = 0; i < activities.length; i++) {
      markers.addData(activities[i]);
    }
    
    var LogoController = L.Control.extend({
      options: { position: 'bottomleft' }
      ,onAdd: function (map) {
        return L.DomUtil.create('div', 'dnt-ung-logo');
      }
    });
    map.addControl(new LogoController());
    
  });    
}).call(this);
