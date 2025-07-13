// // New Delhi coordinates
// const newDelhiCoords = [28.6139, 77.2090];

// // Ensure map container exists (important if multiple pages share layout)
// if (document.getElementById('map')) {
//   const map = L.map('map').setView(newDelhiCoords, 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; OpenStreetMap contributors'
//   }).addTo(map);

//   L.marker(coordinates)
//     .addTo(map)
//     .bindPopup('📍 New Delhi')
//     .openPopup();
// }

// console.log("coordinates",coordinates)
// const marker = L.marker(coordinates) // [lat, lng]
//   .addTo(map)
//   .bindPopup("📍 Marker added")
//   .openPopup(); // Optional: opens popup automatically


if (document.getElementById('map')) {
  // These coordinates must be injected into the page before this script runs
  const coordinates = window.listingCoordinates; // [lat, lng]
  const title = window.listingTitle;

  // Init map
  const map = L.map('map').setView(coordinates, 13);

  // Add OSM tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add marker
  L.marker(coordinates)
    .addTo(map)
    .bindPopup(`📍 ${title}`)
    .openPopup();
}
