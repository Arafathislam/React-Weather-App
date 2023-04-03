import React, { useEffect, useState } from 'react'
import "./style.css"
import Weather from './weather';
const Temp = () => {


const [searchValue,setSearchValue]=useState("Narayanganj");
const [tempInfo ,setTempInfo]=useState({});

const getWeatherInfo =async()=>{
    try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a5fe25612f868a2825d8f31d77a791c1`;

        const res= await fetch(url);
        const data= await res.json();

        const {temp ,humidity,pressure}=data.main;
        const {main:weathermood}=data.weather[0];
        const {name}=data;
        const {speed}=data.wind;
        const {country,sunset} =data.sys;
        
        const myNewWeatherInfo={
            temp,humidity,pressure,weathermood,speed,country,sunset,name,
        }
       
        setTempInfo(myNewWeatherInfo);
    }catch(error){
        console.log(error);
    }
};

useEffect(()=>{
    getWeatherInfo();
},[]);

  return (
    <>
    <div className='wrap'>
        <div className='search'>
        <input
        placeholder='search ...'
        autoFocus
        id ='search'
        className='searchTrem'
        value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
        />
        <button className='searchButton' type='button' onClick={getWeatherInfo}> Search</button>
        </div>

    </div>

        <Weather  tempInfo={tempInfo}/>

    </>
  )
}

export default Temp