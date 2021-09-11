import React,{useState} from "react";
import { SearchBox} from "./styles";
import ReactiveButton from 'reactive-button';


const Go = (props) => {
  const [state, setState] = useState('idle');
  const { updateCity, fetchWeather } = props;
  updateCity('Curico')

  const onClickHandler = () => {
    setState('loading');
    setTimeout(() => {
       setState('success');
    }, 2000);
 }

  return (
    <>      
      <SearchBox onSubmit={fetchWeather}>

        <ReactiveButton
        type={"submit" }
         buttonState={state}
         onClick={onClickHandler}
         color={'green'}
         idleText={'Ver Campo'}
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
      </SearchBox>
    </>
  );
};
export default Go