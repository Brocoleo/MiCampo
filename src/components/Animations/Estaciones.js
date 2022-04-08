import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/charts.json'

const Estaciones = () => {

    const defaultOptions = {
        loop: false,
        autoplay: false, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div>
        <Lottie options={defaultOptions} height={120} width={120}  speed={1}/>
        </div>
    )
}

export default Estaciones   