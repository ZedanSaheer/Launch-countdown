const ipAddressBox = document.getElementById("ip_address");
const locationBox = document.getElementById("location_address");
const timeZoneBox = document.getElementById("time_address");
const ispBox = document.getElementById("isp_address");
const text = document.getElementById("text");
const button = document.getElementById("arrow")

displayIpAddress();

button.addEventListener("click",()=>{
   if(text.value){
       checkData(text.value);
   } else {
      alert("Enter IP or Domain Correctly");
   }
})

async function displayIpAddress() {
    const URL = await fetch("https://api64.ipify.org?format=json");
    const data = await URL.json();
    const dataIP = await data.ip;

    text.value = dataIP;
    checkData(dataIP);
}

function checkData(inputValue){
    const input=inputValue;
    const domainFormat=/^(?!\-)[A-Za-z0-9 \-?]{2,63}\.([a-zA-Z]{2,4})([. a-z]{2,4})?$/;
    const ipFormat=/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/;
    
    if(input.match(domainFormat)){
        getInfo(input,"domain");
    } else if(input.match(ipFormat)){
       getInfo(input,"ipAddress");
    }
    else{
        alert("Invalid Ip or Domain Format!")
    }
}

async function getInfo(inputValue,inputType) {
    const geoDetails = `https://geo.ipify.org/api/v1?apiKey=at_1icnPJ2ELVKbDQVkwuiHioomdyRvf&${inputType}=${inputValue}`;
    const repsonse= await fetch(`${geoDetails}`);
    const finalData = await repsonse.json();
    if(finalData.code==422){
        alert(finalData.messages);
    }
    console.log(finalData);
    
    getBoxDetails(finalData);
   /*  getMapInfo(finalData); */
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

/* function getMapInfo(finalData){
    const lat = finalData.location.lat;
    const lng = finalData.location.lng;
} */