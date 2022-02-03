import React from 'react'
import '@testing-library/react'
import {render} from '@testing-library/react'
import WeatherStation from "../components/Admin/WeatherStation/WeatherStation"
import { MemoryRouter } from 'react-router-dom';

test('renders parameters', ()=>{
    const props = {
        title: 'Titulo de Prueba',
        temperatura: '34°C',
        humedad: '25%',
        peso: '500gr',
        humedadRelativa: '30%',
    }
    const view = render(<MemoryRouter><WeatherStation props={props} /></MemoryRouter>)
    console.log(view)
})