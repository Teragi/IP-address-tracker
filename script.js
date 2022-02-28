const APICALL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_eFopyO7euH9tSkthUTdaO50GS5seg&ipAddress=`
const searchForm = document.querySelector(`.searchBar`);
const searchInput = document.querySelector('.ipInput');
const ipAddress = document.querySelector('.ipAddress');
const locationValue = document.querySelector('.locationValue');
const timeZone = document.querySelector('.timeZoneValue');
const ispValue = document.querySelector('.ispValue');

async function searchIp (ip) {
    const response = await fetch(`${APICALL}${ip}`)
    const data = await response.json();
    console.log(data);
    const latitude = data.location.lat;
    const longitude = data.location.lng;
    console.log(data.isp)
    ipAddress.innerHTML = data.ip;
    locationValue.innerHTML = data.location.country +", "+ data.location.region +", "+ data.location.postalCode;
    timeZone.innerHTML = "HTC " + data.location.timezone;
    ispValue.innerHTML = data.isp;

    myMap.setView([latitude, longitude], 13);
    marker = new L.marker([data.location.lat, data.location.lng]).addTo(myMap);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(searchInput.value);
    if(searchInput.value.length > 0 ){
        searchIp(searchInput.value);
    }
    searchForm.reset();
})

const myMap = L.map('map').setView([30.0444, 31.2357], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9oYW1vaGFtbWVkIiwiYSI6ImNrZ2xiZG5idTByamkzMG5hb3JrdG5mazQifQ.kn4WxorvMQJI5Q8GA4O13A', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(myMap);

const marker = L.marker([30.0444, 31.2357]).addTo(myMap);

