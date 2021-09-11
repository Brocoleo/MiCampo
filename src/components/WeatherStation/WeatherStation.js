import React from "react";

import { WeatherInfoContainer, WeatherInfoLabel, InfoContainer, InfoIcon, InfoLabel} from "./styles"

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
const WeatherStation = (props) => {
    const {weather} = props;
    const isDay = weather?.weather[0].icon?.includes('d')
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }
    return (
        <>            

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

export default WeatherStation;
