import React from "react";

import { WeatherInfoContainer, WeatherInfoLabel, InfoContainer, InfoIcon, InfoLabel} from "./styles"

export const WeatherInfoIcons = {
    temperatura: "/react-weather-app/icons/termometro.svg",
    humedad: "/react-weather-app/icons/humidity.svg",
    luminosidad: "/react-weather-app/icons/sun.svg",
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

    return (
        <>            

            <WeatherInfoLabel>Informacion de mi Campo</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherInfoComponent name={"temperatura"}value={`25°C`}/>  
                <WeatherInfoComponent name={"humedad"} value={weather?.main?.humidity +` %`}/>
                <WeatherInfoComponent name={"luminosidad"} value={740}/>
                <WeatherInfoComponent name={"presión"} value={weather?.main?.pressure  + ` hPa`}/>
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherStation;
