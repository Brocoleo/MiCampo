import React,{useState} from "react";
import Robot from '../Animations/Robot'
import { WeatherInfoContainer, WeatherInfoLabel,InfoContainer} from "./styles"
import ReactiveButton from 'reactive-button';



const WeatherInfoComponent = () => {
    const [state, setState] = useState('idle');
    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
           setState('success');
        }, 2000);
     }

    return (
        <InfoContainer>
              <Robot />
              <ReactiveButton
                type={"submit" }
                buttonState={state}
                onClick={onClickHandler}
                color={'Blue'}
                idleText={'Pedir Ayuda'}
                loadingText={'Cargando'}
                successText={'Listo'}
                errorText={'Error'}
                className={'class1 class2'}
                style={{ borderRadius: '15px' }}
                outline={false}
                shadow={false}
                rounded={false}
                size={'large'}
                block={false}
                messageDuration={2000}
                disabled={false}
                buttonRef={null}
                width={null}
                height={null}
                animation={true}
            />
        </InfoContainer>
    );
};


const Assistent = () => {

    return (
        <>            

            <WeatherInfoLabel>Asistente de Riego</WeatherInfoLabel>
            <WeatherInfoContainer>
            <WeatherInfoComponent />            
            </WeatherInfoContainer>
        </>
    );
};

export default Assistent;
