import React, {useState, useEffect, useCallback} from 'react'
import FadeIn from 'react-fade-in';
import axios from 'axios';
import Water from '../../components/Animations/Water'
import { Container, Row, Col } from 'react-grid-system';
import Loading from '../../components/Loading'
import Notifications from '../Notifications'
import {WeatherUserContainer, NotificationsContainer} from '../styles'
import WeatherStation from "../../components/WeatherStation/WeatherStation";



const historialUrl='https://sensores-citra.herokuapp.com/api/historial/all'

const DashUser = () => { 
  const sensor = "S02";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ1LCJyb2xlIjoiQURNSU5fUk9MRSIsImlhdCI6MTY0OTExOTYwMX0.PcfqJbEXcIBuf7z2dClgS4wuT9G8BOKjy5pqP9XxWgU"
  const [tipoCultivo, setTipoCultivo] = useState();
  const [loading, setLoading] = useState(false);
  const [verGraficas, setVerGraficas] = useState(true);
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
      const reversed = filtrado.reverse();
      if(reversed){
        setMaxMin(reversed.map(item => item.temperatura))
        setMin(Math.min(...maxMin).toFixed(1))
        setMax(Math.max(...maxMin).toFixed(1))
        setTipoCultivo(reversed[0].nombre_cultivo)
        const largo = reversed.length
        const inicio = reversed.length-30
        const datos = reversed.slice(inicio, largo);
        console.log(datos)
        if(reversed && datos.length > 0){
          setTemperatura(datos.map(item => item.temperatura))
          setHumedad(datos.map(item => item.humedad))
          setPeso(datos.map(item => item.peso_actual))
  
        }else{
          setVerGraficas(false)
        }
      }
      
    
   });
  }, [ sensor, token, maxMin])

  useEffect(() => {
    getHistorial()
  }, [getHistorial, sensor])

  setTimeout(() => {
    setLoading(true)
  }, 1000);
   

  return (<>
    { verGraficas ? (
         loading && temperatura && humedad && peso && tipoCultivo && max && min? (  <div>
          <Container>
          <Row>
          <Col>
        <FadeIn className='tipoGrafica'>
          <WeatherUserContainer >
          <WeatherStation title={` Sensor ` +sensor} tipo={tipoCultivo} temperatura={temperatura[temperatura.length - 1]} 
          humedad={humedad[humedad.length -1]} peso={peso[peso.length -1]}
        />
        
          </WeatherUserContainer>  
          </FadeIn> 
          </Col>
          <Col>
          <FadeIn className='tipoGrafica'>
          <NotificationsContainer>
          <span className="notiLabel">Asistencia de Riego </span>
      
          <Water />
       

          <h2 style={{ padding : '8px' }}>{ (0.0023 * ((parseFloat(min)+parseFloat(max)/2)+1.78) * (Math.pow(parseFloat(max)-parseFloat(min), 0.5) )* 19.66).toFixed(1) } mm</h2>
   
          </NotificationsContainer>

          <NotificationsContainer>
          <span className="notiLabel">Estado del {tipoCultivo} </span>
          <Notifications tipo={tipoCultivo} temperatura={temperatura[temperatura.length - 1]} humedad={humedad[humedad.length -1]}  />
          </NotificationsContainer>
          </FadeIn>
          </Col>
  
     
     </Row> </Container> </div>):( <div className="loading"><Loading /> </div>)
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
