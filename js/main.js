document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa centrado en las coordenadas de la primera diapositiva
    var map = L.map('map').setView([40.7128, -74.0060], 12);

    // Agregar capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    // Manejar las diapositivas
    var slides = document.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        slide.addEventListener('click', function() {
            var lat = parseFloat(slide.getAttribute('data-lat'));
            var lng = parseFloat(slide.getAttribute('data-lng'));
            var zoom = parseInt(slide.getAttribute('data-zoom'));
            map.setView([lat, lng], zoom);
        });
    });

    // Integrar servicios WMS de GeoServer
    var wmsLayer = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:Auditorios',
        format: 'image/png',
        transparent: true
    }).addTo(map);

    // Si no necesitas WFS, elimina el siguiente código
    var wfsLayer = L.geoJSON(null, {
        // Opciones para WFS
    });

    fetch('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms?service=WMS&version=1.1.0&request=GetMap&layers=Espacios_culturales_Cultured_Maps%3AAuditorios&bbox=-8249775.7347%2C501584.6675999984%2C-8243090.322699999%2C522679.45870000124&width=330&height=768&srs=EPSG%3A3857&styles=&format=application/openlayers')
        .then(response => response.json())
        .then(data => wfsLayer.addData(data))
        .catch(error => console.error('Error loading WFS data:', error));
});
