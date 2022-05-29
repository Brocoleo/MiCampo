import React from "react";
import "react-sweet-progress/lib/style.css";
import { WeatherInfoContainer, WeatherInfoSub, WeatherInfoLabel, InfoContainer, InfoIcon, InfoLabel} from "./styles"

export const WeatherInfoIcons = {
    temperatura: "/icons/termometro.svg",
    humedad: "/icons/humidity.svg",
    luminosidad: "/icons/sun.svg",
    presión: "/icons/pressure.svg",
    peso: "/icons/peso.svg",
    viento: "/icons/direccionViento.svg",
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





const WeatherStation = ({title, tipo, temperatura, humedad, peso}) => {


    
   
    return (
        <>            

            <WeatherInfoLabel>{title}</WeatherInfoLabel>
            <WeatherInfoSub>Tipo de Cultivo : {tipo}</WeatherInfoSub>
            <WeatherInfoContainer>
            
            
                {humedad ? (<WeatherInfoComponent name={"humedad"} value={humedad.toFixed(1)+` %`}/>) : (<div> </div>)}
                {temperatura ? (<WeatherInfoComponent name={"temperatura"}value={temperatura.toFixed(1)+` °C`}/> ) : (<div></div>)}
                {peso ? (<WeatherInfoComponent name={"peso"} value={peso +` gr`}/>) : (<div></div>)}
               
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherStation;
