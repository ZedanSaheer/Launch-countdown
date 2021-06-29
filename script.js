/* `https://ipgeolocation.abstractapi.com/v1/?api_key=9f8ad84b34fd4f60b3de2640038168f5` */

/* https://geo.ipify.org/api/v1?apiKey=at_H4rEyfLcL1dEupnpCxXIdreIDg1z8&ipAddress=${ip}` */

const ipAddress = document.querySelector("#ip_address");
const locationAddress = document.querySelector("#location_address");
const timeAddress = document.querySelector("#time_address");
const ispAddress = document.querySelector("#isp_address");
const button = document.querySelector("#button");
const text = document.querySelector("#text");
const map = L.map('mapid').setView([51.505, -0.09], 13);

window.onload = async () => {
    const data = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=9f8ad84b34fd4f60b3de2640038168f5`);
    updateText(data);
    console.log(data);
    displayMap(map,
        data.data.latitude,
        data.data.longitude,
        data.data.city,
        data.data.region);
}

button.addEventListener('click', async () => {
    ip = text.value;
    ipFormat = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    if (ip.match(ipFormat)) {
        const data = await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_1icnPJ2ELVKbDQVkwuiHioomdyRvf&ipAddress=${ip}`);
        updateTextClick(data);
        displayMap(map,
            data.data.location.lat,
            data.data.location.lng,
            data.data.location.city,
            data.data.location.region);
        ip = "";
    } else {
        alert("Please Enter Valid IP Address")
    }

})

function displayMap(map, latitude, longitude, city, state) {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
   tiles.addTo(map);

    const layer = L.marker([latitude, longitude]).addTo(map);
    map.setView([latitude, longitude], 9);
}

function updateText(data) {
    ipAddress.innerText = data.data.ip_address;
    locationAddress.innerText = data.data.city + "," + data.data.region + "," + data.data.country;
    timeAddress.innerText = data.data.timezone.current_time;
    ispAddress.innerText = data.data.connection.isp_name;
}
function updateTextClick(data) {
    ipAddress.innerText = data.data.ip;
    locationAddress.innerText = data.data.location.city + "," + data.data.location.region + "," + data.data.location.country;
    timeAddress.innerText = data.data.location.timezone;
    ispAddress.innerText = data.data.isp;
    header = document.querySelector(".three h2");
    header.innerText = "Timezone"

}
