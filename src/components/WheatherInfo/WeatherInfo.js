import React,{useState} from "react";
import axios from "axios";
import Selector from "../Selector";
import { CommonLoading } from 'react-loadingg';
import {Condition, WeatherInfoContainer, WeatherInfoLabel, Location, InfoContainer, InfoIcon, InfoLabel, WeatherContainer} from "./styles"

export const WeatherInfoIcons = {
    atardecer: "/icons/sunset.svg",
    amanecer: "icons/sunrise.svg",
    humedad: "/icons/humidity.svg",
    viento: "/icons/wind.svg",
    presión: "/icons/pressure.svg",
};


const WeatherInfoComponent = (props) => {
    const {name, value} = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherInfoIcons[name]}/>
            <InfoLabel>
                {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    );
};
const WeatherComponent = () => {
    const [weather, updateWeather] = useState();
    const fetchWeather =  () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Curico&appid=fe4feefa8543e06d4f3c66d92c61b69c&lang=es`).then((response) => {
            updateWeather(response.data);
        });
      };
      fetchWeather()
      const isDay = weather?.weather[0].icon?.includes('d')
      const getTime = (timeStamp) => {
          return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
      }
   
    return (
        <>
            {weather ? (<>
           <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
            <WeatherContainer>
            
                <Condition>
                    <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
                    {`  |  ${weather?.weather[0].description}`}
                </Condition>
                <Selector role={weather?.weather[0].icon} />
            </WeatherContainer>
            

            <WeatherInfoLabel>Informacion Climatica</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherInfoComponent name={isDay ? "atardecer" : "amanecer"}
                                      // eslint-disable-next-line no-useless-concat
                                      value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}` + ` hrs`}/>
                <WeatherInfoComponent name={"humedad"} value={weather?.main?.humidity +` %`}/>
                <WeatherInfoComponent name={"viento"} value={weather?.wind?.speed + ` m/s`}/>
                <WeatherInfoComponent name={"presión"} value={weather?.main?.pressure  + ` hPa`} />
            </WeatherInfoContainer>
            </>
                ) : (
                    <CommonLoading />
                )}
            
        </>
    );
};

export default WeatherComponent;
