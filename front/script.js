// Define the map variable outside the DOMContentLoaded event listener for global access
let map;

// Define a variable to store the clicked marker
let clickedMarker = null;

// Function to fetch and update the heatmap data
function updateHeatmap() {
    let date = document.getElementById('date-picker').value;
    if (!date) return;

    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth() + 1;
    let day = new Date(date).getDate();

    fetch(`http://localhost:3000/api/coordinates/?year=${year}&month=${month}&day=${day}`)
        .then(response => response.json())
        .then(data => {
            // Clear existing markers
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add new markers and bind popup with data
            data.forEach(coord => {
                let marker = L.marker([coord.latitude, coord.longitude]).addTo(map);
                marker.bindPopup(`<strong>${coord.city_name}</strong><br>AQI: ${coord.aqi}<br>CO: ${coord.co}`);
                
                // Add click event to fetch and show detailed data
                marker.on('click', function() {
                    fetch(`http://localhost:3000/api/coordinates/${coord.city_id}`)
                        .then(response => response.json())
                        .then(cityData => {

                            if (clickedMarker) {
                                clickedMarker.closePopup();
                            }
                            marker.bindPopup(
                                `<strong>${cityData.city_name}</strong><br>` +
                                `AQI: ${cityData.aqi}<br>` +
                                `CO: ${cityData.co}<br>` +
                                `NO: ${cityData.NO}<br>` +
                                `NO2: ${cityData.no2}<br>` +
                                `O3: ${cityData.o3}<br>` +
                                `SO2: ${cityData.so2}<br>` +
                                `PM2.5: ${cityData.pm2_5}<br>` +
                                `PM10: ${cityData.pm10}<br>` +
                                `NH3: ${cityData.nh3}`
                            ).openPopup();
                            clickedMarker = marker;
                        })
                        .catch(error => console.error('Error fetching city data:', error));
                });
            });
        })
        .catch(error => console.error('Error fetching coordinates:', error));
}

// Wait for DOMContentLoaded event to ensure all elements are loaded before accessing them
document.addEventListener('DOMContentLoaded', () => {
    map = L.map('map').setView([37.8, -96], 4);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // Initialize date picker
    var picker = new Pikaday({
        field: document.getElementById('date-picker'),
        format: 'YYYY-MM-DD',
        minDate: new Date('2020-11-27'),
        maxDate: new Date('2023-11-28'),
        onSelect: updateHeatmap
    });

    // Set initial default date
    let defaultDate = '2020-11-28';
    document.getElementById('date-picker').value = defaultDate;
    picker.setDate(defaultDate); // Also set the picker value

    // Initial heatmap load with the default date
    updateHeatmap();
});
