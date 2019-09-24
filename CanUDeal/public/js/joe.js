//GEOLOCATOR NEED TO COMB THROUGH

var searchRadiusVar = Math.floor(convertToMeters(parseInt($("#locationRadius").val()))).toString();


$("#restaurant-button").on("click", function () {
    spotCategory = "restaurant"
});

$("#cafe-button").on("click", function () {
    spotCategory = "cafe"
});

$("#bar-button").on("click", function () {
    spotCategory = "bar"
});



function initMap() {

    var map;

    var firstAddress;
    var secondAddress;
    var addressArray = [];

    $('#addressSubmit').on('click', function () {
        event.preventDefault();
        firstAddress = $('#userInput').val().trim();
        secondAddress = $('#friendInput').val().trim();
        addressArray.push(firstAddress, secondAddress);
        $('#userInput').val("");
        $('#friendInput').val("");
        logAddresses();

    });


    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: 39.09973, lng: -94.57857 },
        zoom: 10
    });


    var geocoder = new google.maps.Geocoder();

    var lat1;
    var lng1;
    var lat2;
    var lng2;
    var centerMarker = [];

    function logAddresses() {

        var userMarkerIcon = "https://img.icons8.com/ios-filled/50/000000/user-location.png";
        var centerPosition;
        var weatherLat;
        var weatherLng;

        var addressConverterOne = geocoder.geocode({ 'address': firstAddress }, function (results, status) {

            console.log(status);
            var marker;
            lat1 = results[0].geometry.viewport.na.j;
            lng1 = results[0].geometry.viewport.ga.j;
            centerMarker.push(lat1, lng1);
            var geoAddress = { lat: lat1, lng: lng1 };
            marker1 = new google.maps.Marker({ position: geoAddress, map: map, icon: userMarkerIcon });

            $('#userInput').val("");
            $('#userInput').empty();

        });

        var addressConverterTwo = geocoder.geocode({ 'address': secondAddress }, function (results, status) {

            console.log("GEOCODER STATUS: " + status);
            var marker;
            lat2 = results[0].geometry.viewport.na.j;
            lng2 = results[0].geometry.viewport.ga.j;
            centerMarker.push(lat2, lng2);
            var geoAddress = { lat: lat2, lng: lng2 };
            marker2 = new google.maps.Marker({ position: geoAddress, map: map, icon: userMarkerIcon });

            $('#userInput').val("");
            $('#userInput').empty();

            findCenter();

            createPlaces(centerPosition);
        });