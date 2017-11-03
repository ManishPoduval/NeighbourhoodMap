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
	var defaultIcon = makeMarkerIcon('0091ff');
	var highlightedIcon = makeMarkerIcon('FFFF24');  
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
          mapTypeControl: false/*,
          styles: mapStyles*/
        });
	createMarkers();
};

function mapViewModel() {


}

//ko.applyBindings(new mapViewModel())