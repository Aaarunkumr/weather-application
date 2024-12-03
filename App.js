import React, { useEffect, useState } from 'react';
import './App.css'

import searchIcon from "./images/search.png";
import clearIcon from "./images/clear.png";
import cloudIcon from "./images/clouds.png";
import drizzleIcon from "./images/drizzle.png";
import rainIcon from "./images/rain.png";
import windIcon from "./images/wind.png";
import snowIcon from "./images/snow.png";
import humidityIcon from "./images/humidity.png";
const WeatherDetails = ({icon , temp ,city ,country ,lat, lon,humidity, wind}) =>{
     return(
      <>
      <div className='image'>
         <img src={icon}/>
      </div>
      <div className='temp'>{temp}°C</div>
      <div className='location'>{city}</div>
      <div className='contury'>{country}</div>
      <div className='cord'>
         <div>
            
            <span className='lat'>Latitude</span>
            <span>{lat}</span>
         </div>
         <div>
            
            <span className='log'>Longitude</span>
            <span>{lon}</span>
         </div>
      </div>
      <div className='data-container'>
         <div className='element'>
            <img src={humidityIcon} alt='humidity' className='icon'/>
            <div className='data'>
               <div className='humidity-percent'>{humidity}%</div>
               <div className='text'> Humidity</div>
            </div>
         </div>
  
         <div className='element'>
            <img src={windIcon} alt='wind' className='icon'/>
            <div className='data'>
               <div className='wind-percent'>{wind}km/h</div>
               <div className='text'> Wind Speed</div>
            </div>
         </div>
         </div>
      </>
     )
}


function App (){

   const [icon, seticon] = useState(clearIcon);
   const [temp, setTemp] = useState(29);
   const [city, setCity] = useState("london");
   const [country, setCountry] = useState("India");
   const [lat, setLat] = useState(0);
   const [lon, setLon] = useState(0);
   const [humidity, setHumidity] = useState('0');
   const [wind, setWind] = useState('0');

   const [text, setText] = useState("london")
   const [cityNotFound, setCityNotFound] = useState(false);
   const [loading, setLoading] = useState(false);

   const weatherIconMap = {
      "01d":clearIcon,
      "02n":clearIcon,
      "02d":cloudIcon,
      "02n":cloudIcon,
      "03d":drizzleIcon,
      "03n":drizzleIcon,
      "04d":drizzleIcon,
      "04n":drizzleIcon,
      "09d":rainIcon,
      "09n":rainIcon,
      "10d":rainIcon,
      "10n":rainIcon,
      "13d":snowIcon,
      "13n":snowIcon,
   }


   const search=async()=>{
      setLoading(true);
      let api_key ="0357f9474a463f2ed10a7f82bd177f32"
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}& units=Metric`


   try{
      let res = await fetch(url);
 let data =await res.json();
if(data.cod === "404"){
   console.error("City not found");
   setCityNotFound(true);
   setLoading(false);
   return;
}
 setHumidity(data.main.humidity);
 setWind(data.wind.speed);
 setTemp(Math.floor(data.main.temp));
 setCity(data.name);
 setCountry(data.sys.country);
 setLat(data.coord.lat)
 setLon(data.coord.lon);

 const weatherIconCode=data.weather[2].icon;
 seticon( weatherIconMap[weatherIconCode] || clearIcon);
 setCityNotFound(false);

   } catch(error){
       console.error("An error occurred while:", error.message)
   }finally{
   setLoading(false);
   }
   }
   const handlecity = (e) => {
      setText(e.target.value);
   }
   const handleonkeydown =(e) => {
      if(e.key === 'Enter'){
         search()
      }
   }

   useEffect(function(){
      search();
   })
return (
  <>
  <div className='container'>
   <div className='input-container'>
      <input type='text' className='cityInput' placeholder='Search city' onChange={handlecity}  value={text} onKeyDown={handleonkeydown}/>
      <div className='search-Icon' onClick={() => {
         search();
      }}> 
         <img src={searchIcon} alt='search' />
      </div>
      
   </div>
   <WeatherDetails icon={clearIcon} temp={temp} city={city} country={country}
    lat={lat} lon={lon} humidity={humidity} wind={wind}/>
   

   <p className='copy-right'>
      Desinged by <span>Arun kumar</span>
   </p>
      </div>
 
  </>
)


}


export default App;