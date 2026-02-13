let url1="https://api.openweathermap.org/data/2.5/weather?q=";
let url2="&appid=a3cce11db7b16c8d08479107a1ebb14f&units=metric";
let input=document.querySelector("input");
let humidity=document.querySelector(".humidity .percent");
let speed=document.querySelector(".windSpeed .speed");
let img=document.querySelector("img");
let temp=document.querySelector(".temp h1");
let cloud=document.querySelector(".temp h2");
let btn=document.querySelector("button");
let aqi=document.querySelector(".data .aqi-label");
let aqiStatus=document.querySelector(".data .aqi");
let pressureValue=document.querySelector(".data .pressure-value");
let slider=document.querySelector(".slider");
//aqi
async function getaqi(city){
    try{
         response= await axios.get("https://api.waqi.info/feed/"+city+"/?token=0a120c4774ebf338226798f23e9f2dadcf7cbbd1");
    }
    catch(error){
        aqi.innerText="N/A";
        aqiStatus.innerText="Unavailable";
        return;
    }
    aqi.innerText=response.data.data.aqi;
    if(aqi.innerText=="undefined"){
        aqi.innerText="N/A";
    }
    if(response.data.data.aqi<=50){
        aqiStatus.innerText="Good";
    }
    else if(response.data.data.aqi>50 && response.data.data.aqi<=100){
        aqiStatus.innerText="Moderate";
    }
    else if(response.data.data.aqi>100 && response.data.data.aqi<=150){
        aqiStatus.innerText="Sensitive";
    }
    else if(response.data.data.aqi>150 && response.data.data.aqi<=200){
        aqiStatus.innerText="Unhealthy";
    }
    else if(response.data.data.aqi>200 && response.data.data.aqi<=300){
        aqiStatus.innerText="Severe";
    }
    else{
        aqiStatus.innerText="Hazardous";
    }
}
//
function getwinddir(deg){
    if(deg>=337.5 || deg<22.5){
        return "North";
    }
    else if(deg>=22.5 && deg<67.5){
        return "North-East";
    }
    else if(deg>=67.5 && deg<112.5){
        return "East";
    }
    else if(deg>=112.5 && deg<157.5){
        return "South-East";
    }
    else if(deg>=157.5 && deg<202.5){
        return "South";
    }
    else if(deg>=202.5 && deg<247.5){
        return "South-West ";
    }
    else if(deg>=247.5 && deg<292.5){
        return "West";
    }
    else{
        return "North-West";
    }
}

async function getdata(city){
    let windDirection=document.querySelector(".wind-direction");
    try{
         response= await axios.get(url1+city+url2);
    }
    catch(error){
        alert("City not found");
        
    }
    
    //pressure in hectopascal
    
    pressureValue.innerText=response.data.main.pressure+" hPa";
    //wind direction in degree
    let windDir=getwinddir(response.data.wind.deg);
    windDirection.innerText=windDir;
    humidity.innerText=response.data.main.humidity+"%";
    speed.innerText=(response.data.wind.speed*3.6).toFixed(2)+" km/h";
    return response.data.main.temp;
}
//
//console.log(response.data.weather[0].main);
async function getcloud(city){
    try{
         response= await axios.get(url1+city+url2);
    }
    catch(error){
        alert("City not found");
        
    }
    let sunrise=new Date(response.data.sys.sunrise*1000).getHours();
    let sunset=new Date(response.data.sys.sunset*1000).getHours();
    let currentTime=new Date().getHours();
    console.log(sunrise,sunset,currentTime);
    slider.value=currentTime;
    console.log(response.data.weather[0].main);
    getimg(response.data.weather[0].icon);
    let date=new Date(response.data.dt*1000);
    let day=document.querySelector(".info span:last-child");
    day.innerText=date.toDateString();
    return response.data.weather[0].main;

}
function changeLocation(city){
    let location=document.querySelector(".info span:first-child");
    location.innerText=city.toUpperCase().trim();
    
}
let imgurl="https://openweathermap.org/img/wn/";
async function getimg(icon){
    try{
         response= await axios.get(imgurl+icon+"@2x.png");
    }
    catch(error){
        alert("Image not found");
        return;
    }   
    img.src=response.config.url;
}

async function showdata(city){
    let data=await getdata(city);
    temp.innerText=data+"°C";
}
let icon=document.querySelector("i");
input.addEventListener("keypress",()=>{
    icon.style.display="none";
});
input.addEventListener("blur",(e)=>{
    icon.style.display="block";
})
btn.addEventListener("click",async()=>{
    let city=input.value.trim();
    await showdata(city);
    cloud.innerText=await getcloud(city);
    changeLocation(city);
    getaqi(city);
    getforecast(city);
})
let row1=document.querySelector(".row1 .col1 h2");
let row2=document.querySelector(".row2 .col1 h2");
let row3=document.querySelector(".row3 .col1 h2");
let row4=document.querySelector(".row4 .col1 h2");
let row5=document.querySelector(".row5 .col1 h2");
let row6=document.querySelector(".row6 .col1 h2");
let row7=document.querySelector(".row7 .col1 h2");
let row8=document.querySelector(".row8 .col1 h2");
let col2row1=document.querySelector(".row1 .col2 h2");
let col2row2=document.querySelector(".row2 .col2 h2");
let col2row3=document.querySelector(".row3 .col2 h2");
let col2row4=document.querySelector(".row4 .col2 h2");
let col2row5=document.querySelector(".row5 .col2 h2");
let col2row6=document.querySelector(".row6 .col2 h2");
let col2row7=document.querySelector(".row7 .col2 h2");
let col2row8=document.querySelector(".row8 .col2 h2");

let col3row1=document.querySelector(".row1 .col3 h2");
let col3row2=document.querySelector(".row2 .col3 h2");
let col3row3=document.querySelector(".row3 .col3 h2");
let col3row4=document.querySelector(".row4 .col3 h2");
let col3row5=document.querySelector(".row5 .col3 h2");
let col3row6=document.querySelector(".row6 .col3 h2");
let col3row7=document.querySelector(".row7 .col3 h2");
let col3row8=document.querySelector(".row8 .col3 h2");
async function getforecast (city){
    try{
         response= await axios.get("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=a3cce11db7b16c8d08479107a1ebb14f&units=metric");
    }
    catch(error){
        alert("City not found");
        return;
    }
    for(let i=0;i<=7;i++){
        let date=new Date(response.data.list[i].dt*1000);
        let hour=date.getHours();
        let minute=date.getMinutes();
        if(i==0){
            row1.innerText=`${hour}:${minute}`;
            
            col2row1.innerText=response.data.list[i].main.temp+"°C";
            col3row1.innerText=response.data.list[i].weather[0].main;
        }
        else if(i==1){
            row2.innerText=`${hour}:${minute}`;
            console.log(response.data.list[i].weather[0].main);
            col2row2.innerText=response.data.list[i].main.temp+"°C";
            col3row2.innerText=response.data.list[i].weather[0].main;
        }
        else if(i==2){
            row3.innerText=`${hour}:${minute}`;
            console.log(response.data.list[i].weather[0].main);
            col2row3.innerText=response.data.list[i].main.temp+"°C";
            col3row3.innerText=response.data.list[i].weather[0].main;
        }
        else if(i==3){
            row4.innerText=`${hour}:${minute}`;
            console.log(response.data.list[i].weather[0].main);
            col2row4.innerText=response.data.list[i].main.temp+"°C";
            col3row4.innerText=response.data.list[i].weather[0].main;
        }
        else if(i==4){
            row5.innerText=`${hour}:${minute}`;
            console.log(response.data.list[i].weather[0].main);
            col2row5.innerText=response.data.list[i].main.temp+"°C";
            col3row5.innerText=response.data.list[i].weather[0].main;
        }
        else if(i==5){
            row6.innerText=`${hour}:${minute}`;
            console.log(response.data.list[i].weather[0].main);
            col2row6.innerText=response.data.list[i].main.temp+"°C";
            col3row6.innerText=response.data.list[i].weather[0].main;
        }
        else if(i==6){
            row7.innerText=`${hour}:${minute}`;
            console.log(response.data.list[i].weather[0].main);
            col2row7.innerText=response.data.list[i].main.temp+"°C";
            col3row7.innerText=response.data.list[i].weather[0].main;
        }
        else{
            row8.innerText=`${hour}:${minute}`;
            console.log(response.data.list[i].weather[0].main);
            col2row8.innerText=response.data.list[i].main.temp+"°C";
            col3row8.innerText=response.data.list[i].weather[0].main;
        }
    }
}

