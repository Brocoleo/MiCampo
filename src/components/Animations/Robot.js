import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/robot.json'

const Robot = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
      
      };
    return (
        <div>
        <Lottie options={defaultOptions} height={120} width={120}  speed={0.5}/>
        </div>
    )
}

export default Robot