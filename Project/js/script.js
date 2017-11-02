var map;

var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 18.576148, lng: 73.889125},
          zoom: 13,
          mapTypeControl: false
        });
};

function mapViewModel() {


}

ko.applyBindings(new mapViewModel())