const ipAddressBox = document.getElementById("ip_address");
const locationBox = document.getElementById("location_address");
const timeZoneBox = document.getElementById("time_address");
const ispBox = document.getElementById("isp_address");

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const text = document.getElementById("text");

displayIpAddress();
getInfo();

async function displayIpAddress() {
    const URL = await fetch("https://api64.ipify.org?format=json");
    const data = await URL.json();
    const dataIP = await data.ip
    text.value = dataIP;
}

async function getInfo() {
    const URL = await fetch("https://api64.ipify.org?format=json");
    const data = await URL.json();
    const dataIP = await data.ip
    text.value = dataIP;
    const geoDetails = `https://geo.ipify.org/api/v1?apiKey=at_1icnPJ2ELVKbDQVkwuiHioomdyRvf&ipAddress=${dataIP}`;
    const repsonse= await fetch(geoDetails);
    const finalData = await repsonse.json();
    console.log(finalData);

    getBoxDetails(finalData);
}

function getBoxDetails(finalData){
    const ipAdd=finalData.ip;
    const ispAdd=finalData.isp;
    const locAdd=`${finalData.location.city},${finalData.location.country}`;
    const timeAdd=finalData.location.timezone;

    ipAddressBox.innerText=ipAdd;
    ispBox.innerText=ispAdd;
    locationBox.innerText=locAdd;
    timeZoneBox.innerText=timeAdd;
}