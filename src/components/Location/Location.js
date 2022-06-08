import React from 'react'
import { GeoContainer, LabelGeo, InfoGeo} from "./styles"
const Location = ({latitud, longitud}) => {
  return (
    <GeoContainer>
            <InfoGeo src="/icons/pin.svg"/>
            <LabelGeo>
            <span> {longitud +'\n'}</span>
            <span>{latitud}</span>   
            </LabelGeo>
        </GeoContainer>
  )
}

export default Location