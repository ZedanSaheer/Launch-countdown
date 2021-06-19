var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const text= document.getElementById("text");
displayIpAddress();

async function displayIpAddress(){
   const URL = await fetch("https://api64.ipify.org?format=json");
   const data = await URL.json();
   const dataIP=await data.ip
   console.log(data);
   console.log(URL);
   text.value=dataIP;
}