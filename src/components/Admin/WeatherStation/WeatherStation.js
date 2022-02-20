import React from "react";
import { WeatherInfoContainer, WeatherInfoLabel, InfoContainer, InfoIcon, InfoLabel} from "./styles"

export const WeatherInfoIcons = {
    temperatura: "/icons/termometro.svg",
    humedad: "/icons/humidity.svg",
    luminosidad: "/icons/sun.svg",
    presión: "/icons/pressure.svg",
    peso: "/icons/peso.svg",
    viento: "/icons/direccionViento.svg",
    luminosidad : "/icons/sun.svg",
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


const WeatherStation = ({title, temperatura, humedad, peso, humedadRelativa, direccionViento, luminosidad}) => {
   
    return (
        <>            

            <WeatherInfoLabel>{title}</WeatherInfoLabel>
            <WeatherInfoContainer>
                {humedad ? (<WeatherInfoComponent name={"humedad"} value={humedad+` %`}/>) : (<div> </div>)}
                {temperatura ? (<WeatherInfoComponent name={"temperatura"}value={temperatura+` °C`}/> ) : (<div></div>)}
                {peso ? (<WeatherInfoComponent name={"peso"} value={peso +` gr`}/>) : (<div></div>)}
                {humedadRelativa ? (<WeatherInfoComponent name={"humedad relativa"} value={humedadRelativa +` %`}/>) : (<div></div>)}
                {direccionViento ? (<WeatherInfoComponent name={"viento"} value={direccionViento +` (m/s)`}/>) : (<div></div>)}
                {luminosidad ? (<WeatherInfoComponent name={"luminosidad"} value={luminosidad }/>) : (<div></div>)}
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherStation;
