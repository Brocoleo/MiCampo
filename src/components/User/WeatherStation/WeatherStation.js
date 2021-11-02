import React from "react";
import { WeatherInfoContainer, WeatherInfoLabel, InfoContainer, InfoIcon, InfoLabel} from "./styles"

export const WeatherInfoIcons = {
    temperatura: "/icons/termometro.svg",
    humedad: "/icons/humidity.svg",
    luminosidad: "/icons/sun.svg",
    presión: "icons/pressure.svg",
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
const WeatherStation = () => {
   
    return (
        <>            

            <WeatherInfoLabel>Estacion Nº1</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherInfoComponent name={"temperatura"}value={`45°C`}/>  
                <WeatherInfoComponent name={"humedad"} value={`15%`}/>
                <WeatherInfoComponent name={"luminosidad"} value={740}/>
                <WeatherInfoComponent name={"presión"} value={`3500hPa`}/>
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherStation;
