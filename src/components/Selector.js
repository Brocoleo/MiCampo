import React from 'react'
import Sunny from './Animations/Sunny'
import PartlyCloudy from './Animations/PartlyCloudy'
import PartlyShower from './Animations/PartlyShower'
import Thunder from './Animations/Thunder'
import SnowSunny from './Animations/SnowSunny'
import Mist from './Animations/Mist'
import Nigth from './Animations/Nigth'
import CloudyNight from './Animations/CloudyNight'
import RainyNight from './Animations/RainyNight'
import SnowNight from './Animations/SnowNight'

const Selector = (props) => {
    const { role } = props
    // eslint-disable-next-line default-case
    switch(role) {
      case '01d':
        return <Sunny /> 
      case '02d':
        return < PartlyCloudy />
      case '03d':
        return < PartlyCloudy />
      case '04d':
        return < PartlyCloudy />
      case '09d':
        return < PartlyShower />
      case '10d':
        return < PartlyShower />
      case '11d':
        return < Thunder />
      case '13d':
        return < SnowSunny />
      case '50d':
        return < Mist />
      case '01n':
        return <Nigth /> 
      case '02n':
        return <CloudyNight /> 
      case '03n':
        return < PartlyCloudy />
      case '04n':
        return < PartlyCloudy />
      case '09n':
        return < PartlyCloudy />
      case '10n':
        return < RainyNight />
      case '11n':
        return < Thunder />
      case '13n':
        return < SnowNight />
      case '50n':
        return < Mist />
      
      
    
    }
}

export default Selector
