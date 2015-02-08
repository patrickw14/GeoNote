'use strict';

angular.module('geonoteApp')
  .controller('MainCtrl', function ($scope, $http, socket, leafletData) {
    angular.extend($scope, {
      defaults: {
        tileLayer: "https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png",
        path: {
            weight: 10,
            color: '#800000',
            opacity: 1
        }
      }
    });

    leafletData.getMap("map").then(function(map) {
    	map.locate({setView: true, maxZoom: 16});

    	map.on('locationfound', function(e) {
    		var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
          .bindPopup("You are within " + radius + " meters of this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
        window.completeLoad();
    	});
    });
  });