import React from 'react'
import { GeoContainer, LabelGeo, InfoGeo} from "./styles"
const Location = ({latitud, longitud, funcion}) => {
  
  return (
    <GeoContainer onClick={()=>funcion()}>
            <InfoGeo src="/icons/pin.svg"/>
            <LabelGeo>
            <span> {longitud +'\n'}</span>
            <span>{latitud}</span>   
            </LabelGeo>
        </GeoContainer>
  )
}

export default Location