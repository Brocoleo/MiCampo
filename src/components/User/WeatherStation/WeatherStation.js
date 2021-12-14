import React from "react";
import { WeatherInfoContainer, WeatherInfoLabel, InfoContainer, InfoIcon, InfoLabel} from "./styles"

export const WeatherInfoIcons = {
    temperatura: "/icons/termometro.svg",
    humedad: "/icons/humidity.svg",
    luminosidad: "/icons/sun.svg",
    presión: "icons/pressure.svg",
    peso: "icons/peso.svg"
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


const WeatherStation = ({title, temperatura, humedad, peso, humedadRelativa}) => {
   
    return (
        <>            

            <WeatherInfoLabel>{title}</WeatherInfoLabel>
            <WeatherInfoContainer>
                {humedad ? (<WeatherInfoComponent name={"humedad"} value={humedad+`%`}/>) : (<></>)}
                {temperatura ? (<WeatherInfoComponent name={"temperatura"}value={temperatura+`°C`}/> ) : (<></>)}
                {peso ? (<WeatherInfoComponent name={"peso"} value={peso +`gr`}/>) : (<></>)}
                {humedadRelativa ? (<WeatherInfoComponent name={"humedad relativa"} value={humedadRelativa +`%`}/>) : (<></>)}
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherStation;
