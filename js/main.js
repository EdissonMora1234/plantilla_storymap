document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    var slides = document.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        slide.addEventListener('click', function() {
            var lat = slide.getAttribute('data-lat');
            var lng = slide.getAttribute('data-lng');
            var zoom = slide.getAttribute('data-zoom');
            map.setView([lat, lng], zoom);
        });
    });

    // Integrar servicios WMS o WFS de GeoServer
    var wmsLayer = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'workspace:layername',
        format: 'image/png',
        transparent: true
    }).addTo(map);

    var wfsLayer = L.geoJSON(null, {
        // Opciones para WFS
    });

    fetch('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms?service=WMS&version=1.1.0&request=GetMap&layers=Espacios_culturales_Cultured_Maps%3AAuditorios&bbox=-8249775.7347%2C501584.6675999984%2C-8243090.322699999%2C522679.45870000124&width=330&height=768&srs=EPSG%3A3857&styles=&format=application/openlayers')
        .then(response => response.json())
        .then(data => wfsLayer.addData(data))
        .catch(error => console.error('Error loading WFS data:', error));
});