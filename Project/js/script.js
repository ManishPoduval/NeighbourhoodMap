var map;
var markers = [];

/*Array of locations that are show by markers by default*/
var locations = [
          {title: 'Goa Science Center', location: {lat: 15.478662, lng: 73.808727}},
          {title: 'Santana Church', location: {lat: 15.478166, lng: 73.891640}},
          {title: 'Fort Aguda', location: {lat: 15.492393, lng: 73.773537}},
          {title: 'Dias Beach', location: {lat: 15.453432, lng: 73.802273}},
          {title: 'Santa Cruz Church', location: {lat: 15.476346, lng: 73.844776}}
        ];

/*This function takes in a COLOR, 
and then creates a new marker icon of that color. 
The icon will be 21 px wide by 34 high, have an origin of 0, 0 
and be anchored at 10, 34).*/
function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
		'|40|_|%E2%80%A2',
		new google.maps.Size(21, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(10, 34),
		new google.maps.Size(21,34));
		return markerImage;
}     

var showDefaultMarkers = function() {
  	 var bounds = new google.maps.LatLngBounds();
	// Extend the boundaries of the map for each marker and display the marker
	 for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
}   
      

/*Creates default 5 markers on the map*/
var createMarkers = function() {
	var defaultIcon = makeMarkerIcon('d9f111');
	var highlightedIcon = makeMarkerIcon('dc0b28');  
	locations.forEach(function(location, index) {
		var position = location.location;
		var title = location.title
		var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: index
		});

		/*store all the markers in an array*/
		markers.push(marker);

		/*create click event listeners for each*/
		marker.addListener('click', function() {
			alert('Marker clicked');
		});	

		marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
    	});
        
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
    	});  
        showDefaultMarkers();
	});	
};

/*Loads the map*/
var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 15.488340, lng: 73.829052},
          zoom: 13,
          mapTypeControl: false,
          styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fffbd0"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#eacbb3"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2b6049"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#20ac43"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "color": "#887168"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#727272"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "color": "#7c92ad"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8aa28e"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1e5468"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0f2d3e"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#0a2f4e"
      }
    ]
  }
]
        });
	createMarkers();
};

function mapViewModel() {


}

//ko.applyBindings(new mapViewModel())