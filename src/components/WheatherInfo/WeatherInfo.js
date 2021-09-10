import React from "react";

import Selector from "../Selector";
import {Condition, WeatherInfoContainer, WeatherInfoLabel, Location, InfoContainer, InfoIcon, InfoLabel, WeatherContainer} from "./styles"

export const WeatherInfoIcons = {
    atardecer: "/react-weather-app/icons/sunset.svg",
    amanecer: "/react-weather-app/icons/sunrise.svg",
    humedad: "/react-weather-app/icons/humidity.svg",
    viento: "/react-weather-app/icons/wind.svg",
    presión: "/react-weather-app/icons/pressure.svg",
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
const WeatherComponent = (props) => {
    const {weather} = props;
    console.log(weather)
    const isDay = weather?.weather[0].icon?.includes('d')
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }
    return (
        <>
            <WeatherContainer>
                <Condition>
                    <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
                    {`  |  ${weather?.weather[0].description}`}
                </Condition>
                <Selector role={weather?.weather[0].icon} />
            </WeatherContainer>
            <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>

            <WeatherInfoLabel>Informacion climatica</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherInfoComponent name={isDay ? "atardecer" : "amanecer"}
                                      value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}/>
                <WeatherInfoComponent name={"humedad"} value={weather?.main?.humidity}/>
                <WeatherInfoComponent name={"viento"} value={weather?.wind?.speed}/>
                <WeatherInfoComponent name={"presión"} value={weather?.main?.pressure}/>
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherComponent;
