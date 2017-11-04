var map, viewModel;
var markers = [];
var googleMapAPIDeferred = $.Deferred();

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function (searchString, position) {
		return this.substr(position || 0, searchString.length) === searchString;
	};
}

/*Array of locations that are shown as top 5 places*/
var locations = [
          {title: 'Goa Science Center', location: {lat: 15.478662, lng: 73.808727}},
          {title: 'Santana Church', location: {lat: 15.478166, lng: 73.891640}},
          {title: 'Fort Aguda', location: {lat: 15.492393, lng: 73.773537}},
          {title: 'Dias Beach', location: {lat: 15.453432, lng: 73.802273}},
          {title: 'Santa Cruz Church', location: {lat: 15.476346, lng: 73.844776}}
 ];


/*lsit of places in goa with lat lng*/
var listOfPlacesDataSet = [
	{title: 'Teleigao market', location: {lat: 15.470018, lng: 73.821902}},
	{title: 'Goa University', location: {lat: 15.458478, lng: 73.834476}},
	{title: 'Dona Paula', location: {lat: 15.461374, lng: 73.813602}},
	{title: 'Reis Magos Fort', location: {lat: 15.497108, lng: 73.809500}},
	{title: 'Goa Museum', location: {lat: 15.493179, lng: 73.833060}},
	{title: 'Joggers Park', location: {lat: 15.486086, lng: 73.826125}},
	{title: 'Boca de Vaca', location: {lat: 15.494750, lng: 73.825722}},
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

/*Creates default 5 markers on the map*/
var createMarkers = function(array) {
	markers = [];
	var defaultIcon = makeMarkerIcon('d9f111');
	var highlightedIcon = makeMarkerIcon('dc0b28');  
	array.forEach(function(location, index) {
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
	});	
};


/*creates the list of places that is shown in the left nav menu*/
var generateList = function() {
	locations.forEach(function(obj){
		viewModel.listOfPlaces.push(obj);
	});

	listOfPlacesDataSet.forEach(function(obj){
		viewModel.listOfPlaces.push(obj);
	});

	/*sort listOfPlaces array*/
	viewModel.listOfPlaces.sort(function(a, b) {
 		var nameA = a.title.toUpperCase(); // ignore upper and lowercase
  		var nameB = b.title.toUpperCase(); // ignore upper and lowercase
  		if (nameA < nameB) {
    		return -1;
  		}
  		if (nameA > nameB) {
   			return 1;
  		}

  		// names must be equal
  		return 0;
	});
};

/*styles for the google map*/
var getStyes = function() {
	return [
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
];
}

/*Loads the map*/
var initMap = function(response) {
	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 15.488340, lng: 73.829052},
          zoom: 10,
          mapTypeControl: false,
          styles: getStyes()
        });
	googleMapAPIDeferred.resolve();
};

var createMapBounds = function(){
	var bounds = new google.maps.LatLngBounds();
	// Extend the boundaries of the map for each marker and display the marker
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
}

/*our viewModel the project*/
function mapViewModel() {
	var self = this;
	/*This will show by markers of the top 5 places in the neighbourhood*/
	self.showListings = function() {
		self.hideListings();
		createMarkers(locations);
		createMapBounds();
		/*hide the navbar so the user can view the complete map*/
		self.toggleMenu();
	};

	/*This will hide the markers of the top 5 places in the neighbourhood*/
	self.hideListings = function() {
		for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        /*hide the navbar so the user can view the complete map*/
        self.toggleMenu();
	};

	/*function will toggle the sidebar on and off*/
	self.toggleMenu = function() {
		$("#wrapper").toggleClass("toggled");
	};

	self.projectTitle = ko.observable('Explore Goa');
	self.listOfPlaces = ko.observableArray([]);
	self.showNeighbourhoodMap = function(){
		self.hideListings();
		viewModel.listOfPlaces([]);
		generateList();
		createMarkers(viewModel.listOfPlaces());
		createMapBounds();
		self.toggleMenu();
	};

	self.filterLocations = function() {
		var text = $('#searchInput').get(0).value;
		var filteredList = [];
		if (isNaN(text) && text.trim() !== ""){
			viewModel.listOfPlaces().forEach(function(location){
				if (location.title.toLowerCase().startsWith(text)) {
					filteredList.push(location);
				}
			});
			self.hideListings();
			viewModel.listOfPlaces(filteredList);
			createMarkers(viewModel.listOfPlaces());
			createMapBounds();
		}
	}

	/*will open info window of the location*/
	self.showInfo = function() {
		alert('location clicked');
	};

}

$(document).ready(function(){
	/*apply bindings when the page is ready*/
	viewModel = new mapViewModel();
	$.when(googleMapAPIDeferred).done(function(){
		generateList();
		viewModel.showNeighbourhoodMap();
	}); 
    ko.applyBindings(viewModel);
});