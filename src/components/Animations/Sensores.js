import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/sensores.json'

const Sensores = () => {

    const defaultOptions = {
        loop: 1,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div>
        <Lottie options={defaultOptions} height={120} width={120}  speed={0.3}/>
        </div>
    )
}

export default Sensores