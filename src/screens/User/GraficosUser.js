import React, {useState, useEffect, useCallback} from 'react'
import LineChart from "../../components/LineChart/LineChart";
import { Container, Row, Col } from 'react-grid-system';
import  { ChartContainer} from '../styles'
import FadeIn from 'react-fade-in';
import axios from 'axios';

import Loading from '../../components/Loading'



  const historialUrl='https://citra-sensores.herokuapp.com/api/historial/all'
const GraficosUser = () => {
    const sensor = "S02";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ1LCJyb2xlIjoiQURNSU5fUk9MRSIsImlhdCI6MTY0OTExOTYwMX0.PcfqJbEXcIBuf7z2dClgS4wuT9G8BOKjy5pqP9XxWgU"
    const grafico = 'linea';
    const [indices, setIndices] = useState();
    const [temperatura, setTemperatura] = useState();
    const [humedad, setHumedad] = useState();
    const [peso, setPeso] = useState();
    const [verGraficas, setVerGraficas] = useState(true);



    const temperaturaLine = {
        labels: indices,
        datasets: [
          {
            label: 'temperatura de la estacion',
            data: temperatura,
            fill: true,
            backgroundColor: 'rgba(255, 38, 38, 0.2)',
            borderColor: 'rgb(255, 38, 28)',
          },
        ],
      };
      const humedadLine = {
        labels: indices,
        datasets: [
          {
            label: 'humedad de la estacion',
            data: humedad,
            fill: true,
            backgroundColor: 'rgba(17, 39, 155,0.2)',
            borderColor: 'rgb(17, 39, 155)',
          },
        ],
      };
     
    
    
    
      const pesoLine = {
        labels: indices,
        datasets: [
          {
            label: 'pesos de la estacion',
            data: peso,
            fill: true,
            backgroundColor: 'rgba(17, 101, 48,0.2)',
            borderColor: 'rgb(17, 101, 48)',
          },
        ],
      };

      const getHistorial = useCallback(async () => {
        const config = {headers: { Authorization: `Bearer ${token}` }};
        axios.get(historialUrl, config).then((response) => {
          const respuesta =response.data
          let filtrado = respuesta.filter(dato=>dato.nombre_sensor === `${sensor}`);
          const reversed = filtrado.reverse();
          if(reversed){
            const largo = reversed.length-20
            const inicio = reversed.length-50
            const datos = reversed.slice(inicio, largo);
            if(reversed && datos.length > 0){
              setIndices(datos.map(item => item.hora.slice(0, -3))) 
              setTemperatura(datos.map(item => item.temperatura))
              setHumedad(datos.map(item => item.humedad))
              setPeso(datos.map(item => item.peso_actual))
            }else{
              setVerGraficas(false)
            }
          }
          
        
       });
      }, [ sensor, token])

 useEffect(() => {
    getHistorial()
  }, [getHistorial, sensor])

  return (
    <>    { verGraficas ? (
        <Container>
          
        <Row>
        <Col>
        <FadeIn>
    {(() => {
  
        switch (grafico) {
          case 'linea':
            return  <Container> <FadeIn> <Row> { humedad && humedad[0]!==null? (<ChartContainer><LineChart title='Humedad' data={humedadLine} /></ChartContainer>) : (<div></div>)}
            { temperatura && temperatura[0]!==null? (<ChartContainer><LineChart title='Temperatura' data={temperaturaLine} /> </ChartContainer>) : (<div></div>)}
                 
            </Row> </FadeIn> </Container>
                default:
                  return  <Container> <FadeIn> <Row> { humedad && humedad[0]!==null? (<ChartContainer><LineChart title='Humedad' data={humedadLine} /></ChartContainer>) : (<div></div>)}
            { temperatura && temperatura[0]!==null? (<ChartContainer><LineChart title='Temperatura' data={temperaturaLine} /> </ChartContainer>) : (<div></div>)}       
            </Row> </FadeIn> </Container>
              }
            })()}
            </FadeIn>
            </Col>
            <Col>
            <FadeIn>
            {(() => {
  
        switch (grafico) {
          case 'linea':
                  return  <Container> <FadeIn> <Row> 
                  { peso && peso[0]!==null? (<ChartContainer><LineChart title='Peso' data={pesoLine} /> </ChartContainer >) : (<div></div>)} 
                  </Row> </FadeIn> </Container>
                default:
                  return <Container> <FadeIn> <Row>
                 { peso && peso[0]!==null? (<Col sm={6}><ChartContainer><LineChart title='Peso' data={pesoLine} /> </ChartContainer ></Col>) : (<></>)}   </Row> </FadeIn> </Container>
              }
            })()}</FadeIn></Col>
            </Row>
            </Container> ):(<FadeIn>
          <br />
          <br />
          <br />
          <Loading />
          </FadeIn>)}
            </>
  )
}

export default GraficosUser