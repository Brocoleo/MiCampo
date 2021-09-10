import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../Lottie/mist.json'

const Mist = (icono) => {

    console.log(icono)
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div>
        <Lottie options={defaultOptions} height={150} width={150}  />
        </div>
    )
}

export default Mist
