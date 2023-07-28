const map = L.map('map').setView([33.247875, -83.441162], 5);

// Set the maximum bounds for the map
const maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
map.setMaxBounds(maxBounds);
map.on('drag', function () {
    map.panInsideBounds(maxBounds, { animate: false });
});

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getMap() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;

   // Set multiple marker locations with tooltips
   const markerLocations = [
    { coords: [latitude, longitude], name: 'Current ISS location' },
    { coords: [33.080803, -83.229658], name: '(Academic) Georgia College & State University', address: '231 W. Hancock St, Milledgeville, GA 31061', phone:'' },
    { coords: [51.5074, -0.1278], name: 'London' },
    { coords: [35.6895, 139.6917], name: 'Tokyo' },
    // Add more locations as needed
    ];

    // Loop through the marker locations and add markers with tooltips to the map
    for (const location of markerLocations) {
        const marker = L.marker(location.coords).addTo(map);
        marker.bindPopup(`<div class="custom-popup-content">
                        <h3>${location.name}</h3>
                        <p>${location.address}</p>
                        <p>${location.phone}</p>
                        </div>`);
    }

    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
}
getMap();




