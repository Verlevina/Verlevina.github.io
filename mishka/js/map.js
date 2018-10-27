;(function() {
    var coordinates = {lat: 59.937178, lng: 30.321943},
      markerImage = './img/icon-map-pin.svg',
      zoom = 15,

      map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: zoom,
        disableDefaultUI: true
      }),


      marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: markerImage
      });

    marker.addListener('click', function () {
      marker.setAnimation(null);
    });
  }
)();
