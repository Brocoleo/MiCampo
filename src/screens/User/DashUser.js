import React, {useState, useEffect, useCallback} from 'react'
import FadeIn from 'react-fade-in';
import axios from 'axios';
import LineChart from "../../components/LineChart/LineChart";
import Water from '../../components/Animations/Water'
import  { ChartContainer} from '../styles'
import { Container, Row, Col } from 'react-grid-system';
import Loading from '../../components/Loading'
import Notifications from '../Notifications'
import {WeatherContainer, NotificationsContainer} from '../styles'
import WeatherStation from "../../components/WeatherStation/WeatherStation";

const historialUrl='https://sensores-citra.herokuapp.com/api/historial/all'

const DashUser = () => { 
  const sensor = "S02";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ1LCJyb2xlIjoiQURNSU5fUk9MRSIsImlhdCI6MTY0OTExOTYwMX0.PcfqJbEXcIBuf7z2dClgS4wuT9G8BOKjy5pqP9XxWgU"
  const [tipoCultivo, setTipoCultivo] = useState();
  const [loading, setLoading] = useState(false);
  const [verGraficas, setVerGraficas] = useState(true);
  const grafico = 'linea';
  const [indices, setIndices] = useState();
  const [temperatura, setTemperatura] = useState();
  const [maxMin, setMaxMin] = useState();
  const [humedad, setHumedad] = useState();
  const [peso, setPeso] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();


   const getHistorial = useCallback(async () => {
    const config = {headers: { Authorization: `Bearer ${token}` }};
    axios.get(historialUrl, config).then((response) => {
      const respuesta =response.data
      let filtrado = respuesta.filter(dato=>dato.nombre_sensor === `${sensor}`);
      setMaxMin(filtrado.map(item => item.temperatura))
      setMin(Math.min(...maxMin))
      setMax(Math.max(...maxMin))
      setTipoCultivo(filtrado[0].nombre_cultivo)
      const largo = filtrado.length
      const inicio = filtrado.length-50
      const datos = filtrado.slice(inicio, largo);
      if(filtrado && datos.length > 0){
        setIndices(datos.map(item => item.hora.slice(1, -3))) 
        setTemperatura(datos.map(item => item.temperatura))
        setHumedad(datos.map(item => item.humedad))
        setPeso(datos.map(item => item.peso_actual))

      }else{
        setVerGraficas(false)
      }
    
   });
  }, [ sensor, token, maxMin])

  useEffect(() => {
    getHistorial()
  }, [getHistorial, sensor])

  setTimeout(() => {
    setLoading(true)
  }, 1000);


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
 


  return (<>
    { verGraficas ? (
         loading && temperatura && humedad && peso && tipoCultivo && max && min? (  <div>
          <Container>
          <Row>
          <Col>
      <FadeIn className='tipoGrafica'>
          <WeatherContainer >
          <WeatherStation title={` Sensor ` +sensor} tipo={tipoCultivo} temperatura={temperatura[temperatura.length - 1]} 
          humedad={humedad[humedad.length -1]} peso={peso[peso.length -1]}
    />
          </WeatherContainer>  
          <NotificationsContainer>
          <span className="notiLabel">Asistencia de Riego </span>
          <Row>
          <Col>
          <Water />
          </Col>
          <Col>
          <h2 style={{ padding : '10px' }}> {max} - {min} </h2>
          </Col>
          </Row>
          </NotificationsContainer>

          <NotificationsContainer>
          <span className="notiLabel">Estado del {tipoCultivo} </span>
          <Notifications tipo={tipoCultivo} temperatura={temperatura[temperatura.length - 1]} humedad={humedad[humedad.length -1]}  />
          </NotificationsContainer>
     </FadeIn> 
     </Col>
     <Col>
     
{(() => {
  
      switch (grafico) {
        case 'linea':
                return  <Container> <FadeIn> <Row> { humedad && humedad[0]!==null? (<ChartContainer><LineChart title='Humedad' data={humedadLine} /></ChartContainer>) : (<div></div>)}
                { temperatura && temperatura[0]!==null? (<ChartContainer><LineChart title='Temperatura' data={temperaturaLine} /> </ChartContainer>) : (<div></div>)}
                { peso && peso[0]!==null? (<ChartContainer><LineChart title='Peso' data={pesoLine} /> </ChartContainer >) : (<div></div>)} 
              </Row> </FadeIn> </Container>
              default:
                return <Container> <FadeIn>  <Row>{ humedad && humedad[0]!==null? (<Col sm={6}><ChartContainer><LineChart title='Humedad' data={humedadLine} /></ChartContainer></Col>) : (<div></div>)}
                { temperatura && temperatura[0]!==null? (<Col sm={6}><ChartContainer><LineChart title='Temperatura' data={temperaturaLine} /> </ChartContainer></Col>) : (<div></div>)}
                { peso && peso[0]!==null? (<Col sm={6}><ChartContainer><LineChart title='Peso' data={pesoLine} /> </ChartContainer ></Col>) : (<></>)}  </Row>  </FadeIn> </Container>
            }
          })()}
</Col> </Row> </Container> </div>):( <div className="loading"><Loading /> </div>)
    ):(<FadeIn>
          <br />
          <br />
          <br />
          <h1 className="bienvenidaSensores">Sensor sin Historial</h1>
          </FadeIn>)}

    </>   
    )
}
export default DashUser
