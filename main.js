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

    const markerLocations = [
        { coords: [latitude, longitude], name: 'Current ISS location' },
        { coords: [33.080803, -83.229658], name: 'Georgia College & State University', address: '231 W. Hancock St, Milledgeville, GA 31061', phone:'' },
        { coords: [33.47835600209376, -82.47668220958346], name: 'Thomson-McDuffie Middle School', address: '1191 White Oak Road', phone:'Phone: (706) 986-4300'},
        { coords: [33.33700908607529, -84.10795056947856], name: 'Locust Grove Public Library', address: '115 Martin Luther King jr Blvd Locust Grove, Georgia 30248', phone:'+16784325353'},
        { coords: [31.6723482626435, -83.2427116870719], name: 'Fitzgerald High School', address: '553 Ocilla Highway Fitzgerald, Georgia 31750', phone:'+12294095530' },
        { coords: [33.86697282421514, -83.41368179442294], name: 'Oconee Public Library', address: '1080 Experiment Station Rd Watkinsville, Georgia 30677', phone:'+17067693950' },
        { coords: [34.06027392652711, -84.22738473566892], name: 'Infinity Learning Educational Services, LLC', address: '142 Prospect Place Alpharetta, Georgia 30005', phone:'(770) 322-4185' },
        { coords: [34.09997050150877, -84.33580084659154], name: 'Milton High School', address: '13025 Birmingham Hwy, Milton, GA 30004', phone:'+14702547000' },
        { coords: [33.88639627062406, -84.1191334473696], name: 'Trickum Middle School', address: '130 Killian Hill Rd SW, Lilburn, GA 30047', phone:'+17709212705' }
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




