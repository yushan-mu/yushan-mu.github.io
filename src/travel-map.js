let map = L.map('map').setView([34.21166705948547, 109.57894904386137], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// my second home...
let waterloo = L.marker([43.472948, -80.537571]).addTo(map);
waterloo.bindPopup('<b>Waterloo</b><br>really miss my friends + hoping to go back soon!');

// some w25 travel plans :)
let hongkong = L.marker([22.278613, 114.162197]).bindPopup('<b>Hong Kong</b><br>Jan 2025!');
let shanghai = L.marker([31.184609, 121.508789]).bindPopup('<b>Shanghai</b><br>hopefully Winter 2025!');
let tokyo = L.marker([35.678729, 139.771064]).bindPopup('<b>Tokyo</b><br>hopefully Winter 2025!');
let seoul = L.marker([37.548975, 126.995410]).bindPopup('<b>Seoul</b><br>hopefully Winter 2025!');

let w25 = L.layerGroup([hongkong, shanghai, tokyo, seoul]).addTo(map);

// layer control
let baseMaps = {};
let  overlayMaps = {
    "Winter 25": w25
}
let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// trying events
let popup = L.popup();

let clickTimer;

function onMapClick(e) {
    if (clickTimer === undefined) return;
    if (onMapClick.popupOpen) {
        map.closePopup(popup);
        onMapClick.popupOpen = false;
    } else {
        let farOrClose;
        let myCurrentAddress = [45.39978975674231, -75.70528312335138];
        let distance = e.latlng.distanceTo(myCurrentAddress);
        if (distance <= 1000) {
            farOrClose = "That's really close to me! Should I go there during lunch?";
        } else if (distance <= 5000) {
            farOrClose = "That's close to me! Should I go there after work?";
        } else if (distance <= 100000) {
            farOrClose = "That's not too far from me! Should I go there this weekend?";
        } else if (distance <= 1000000) {
            farOrClose = "That's a bit far from me! Should I go there for a trip?";
        } else if (e.latlng.distanceTo([31.184609, 121.508789]) <= 3000000) {
            farOrClose = "Should I go there in Winter 2025?";
        } else {
            farOrClose = "That's really far from me! Maybe I could go there for winter break!";
        }

        popup
            .setLatLng(e.latlng)
            .setContent(farOrClose)
            .openOn(map);
        
        onMapClick.popupOpen = true;
    }
}

map.on('click', (e) => {
    clickTimer = setTimeout(() => { onMapClick(e); }, 300);
});

map.on('dblclick', function() {
    clickTimer = undefined;
    map.closePopup();
    onMapClick.popupOpen = false;
});