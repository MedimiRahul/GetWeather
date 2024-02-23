let searchlogo=document.querySelector('.search');
let searchbox=document.querySelector('.searchbox');
let searchcontent=document.querySelector('.searchcontent');
let exitbtn=document.querySelector('.exitbtn');
let searchbtn=document.querySelector('.searchbtn');
let locationofcity=document.querySelector('.location');
let degree=document.querySelector('.degree');
let status=document.querySelector('.status');
let content=document.querySelector('.content');
let searchdone=false;
let container2=document.querySelector('.container2');

let sunrise=document.querySelector('.sunrise');
let sunset=document.querySelector('.sunset');
let windspeed=document.querySelector('.windspeed');
let humidity=document.querySelector('.humidity');


searchlogo.addEventListener('click',searchboxactive);
exitbtn.addEventListener('click',searchboxactive)
searchbtn.addEventListener('click',fetchdatafromAPI);
let cityname , latitude , longitude;

let currentlatitude, currentlongitude;
let currentstaying=false;
window.addEventListener('DOMContentLoaded',currentpositionweather)


let baseurl='https://api.openweathermap.org/data/2.5/weather?q=';
let key='c49e58198efa420abeda522765a87515';
let currentlocationurl='http://api.openweathermap.org/geo/1.0/reverse?';



// searchbox active function

function searchboxactive(){
    if (event.target.className=='search')
    {
    searchcontent.classList.remove('searchcontentoff');
    searchcontent.classList.add('searchcontenton');
    }

    else {
        searchcontent.classList.remove('searchcontenton');
        searchcontent.classList.add('searchcontentoff');

    }
    
}


// updating location wise temperature 

async function fetchdatafromAPI()
{
    if (currentstaying){
        console.log(currentstaying,'11');
        cityname=currentstaying;
        currentstaying=false;
    }
    else{
        console.log(currentstaying);
        cityname=searchbox.value;
        searchboxactive()
    }
    if (cityname.length!=0)
    {
        console.log(cityname)
        let base=`${baseurl}${cityname}&appid=${key}&units=metric`;
        let baseresponse=await fetch(base);
        let basedata= await baseresponse.json();
        // longitude=basedata.coord.lon;
        // latitude=basedata.coord.lat;
        locationofcity.textContent=basedata.name;
        degree.textContent=basedata.main.temp;
        status.textContent=basedata.weather[0].main;
        let x=basedata.sys.sunrise;
        let y=basedata.sys.sunset;
        let z=new Date(x*1000);
        let w=new Date(y*1000);
        let sunrisetime=`${z.getHours()}:${z.getMinutes()}AM`;
        let sunsettime=`${w.getHours()}:${w.getMinutes()}PM`;
        sunrise.textContent=sunrisetime;
        sunset.textContent=sunsettime;
        windspeed.textContent=`${basedata.wind.speed}m/s`;
        humidity.textContent=basedata.main.humidity;
        container2.classList.remove('offstatus');
        container2.classList.add('onstatus');

        if ((basedata.weather[0].id)>199 && (basedata.weather[0].id<531)){
            content.style.backgroundImage="url('images/rain2b.jpg')";

        }
        else if ((basedata.weather[0].id)>599 && (basedata.weather[0].id<623))
        {
            content.style.backgroundImage="url('images/snow2.jpg')";
        }
        
        else if ((basedata.weather[0].id)>800 && (basedata.weather[0].id<805)){
            content.style.backgroundImage="url('images/cloudy.avif')";


        }
        else  {
            content.style.backgroundImage="url('images/sunny2.jpg')";

        }
        

        console.log(basedata.name,basedata.main.temp,basedata.weather[0].main,longitude,latitude);
    }
    


}

async function currentcity(currentlatitude,currentlongitude){
    let base=`${currentlocationurl}lat=${currentlatitude}&lon=${currentlongitude}&appid=${key}`;
    let cityresponse=await fetch(base);
    let citydata=await cityresponse.json();
    currentstaying=citydata[0].name;
    fetchdatafromAPI();
}


function sucess(position){
    currentlatitude=position.coords.latitude;
    currentlongitude=position.coords.longitude;
    currentcity(currentlatitude,currentlongitude)
    

}

function error(){
    console.log('not granted')
}


function currentpositionweather(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(sucess,error);
    }
}


