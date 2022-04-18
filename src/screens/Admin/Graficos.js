import React, {useState, useEffect, useCallback} from 'react' 
import FadeIn from 'react-fade-in'; 
import axios from 'axios'; 
import LineChart from "../../components/LineChart/LineChart"; 
import Water from '../../components/Animations/Water' 
import  { ChartContainer} from '../styles' 
import Cookies from "js-cookie"; 
import { Container, Row, Col } from 'react-grid-system'; 
import Loading from '../../components/Loading' 
import Notifications from '../Notifications' 
import {WeatherContainer, NotificationsContainer} from '../styles' 
import WeatherStation from "../../components/WeatherStation/WeatherStation"; 
 
 
  const historialUrl='http://localhost:3000/api/historial/all' 
  const Graficos = () => { 
    const sensor = Cookies.get("sensor"); 
    const token = Cookies.get("access"); 
    const tipoCultivo = Cookies.get("tipo"); 
    const [loading, setLoading] = useState(false); 
    const [verGraficas, setVerGraficas] = useState(true); 
    const grafico = 'linea'; 
    const [indices, setIndices] = useState(); 
    const [temperatura, setTemperatura] = useState(); 
    const [humedad, setHumedad] = useState(); 
    const [peso, setPeso] = useState(); 
    const [min, setMin] = useState(); 
    const [max, setMax] = useState(); 
    const [maxMin, setMaxMin] = useState(); 
    

    
 
    useEffect(() => { 
      const config = {headers: { Authorization: `Bearer ${token}` }};
      axios.get(historialUrl, config).then((response) => {   
        const respuesta =response.data 
        let filtrado = respuesta.filter(dato=>dato.nombre_sensor === `${sensor}`); 
        console.log(filtrado) 
        filtrado = filtrado.reverse(); 
        const largo = filtrado.length 
        const inicio = filtrado.length-30 
        const datos = filtrado.slice(inicio, largo); 
        if(filtrado && datos.length > 0){ 
          setMaxMin(filtrado.map(item => item.temperatura)) 
          setMin(Math.min(...maxMin).toFixed(1)) 
          setMax(Math.max(...maxMin).toFixed(1)) 
          setIndices(datos.map(item => item.hora.slice(0, -3)))  
          setTemperatura(datos.map(item => item.temperatura))  
          setHumedad(datos.map(item => item.humedad)) 
          setPeso(datos.map(item => item.peso_actual)) 
 
        }else{ 
          setVerGraficas(false) 
        } 
     })
    }, [ sensor,  token, maxMin]) 
 
    setTimeout(() => { 
      setLoading(true) 
    }, 1000); 
 
 
 
    const temperaturaLine = { 
        labels: indices, 
        datasets: [ 
          { 
            label: 'Grados °C', 
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
            label: 'Porcentaje %', 
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
            label: 'Gramos gr', 
            data: peso, 
            fill: true, 
            backgroundColor: 'rgba(17, 101, 48,0.2)', 
            borderColor: 'rgb(17, 101, 48)', 
          }, 
        ], 
      }; 
 
   
    return (<> 
    { verGraficas ? ( 
         loading && temperatura && humedad && peso  && max && min? (  <div> 
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
          <span className="notiTitle">Asistencia de Riego </span> 
          <Row> 
          <Col> 
          <Water /> 
          </Col> 
          <Col> 
          <h2 className="notiLabel">{ (0.0023 * ((parseFloat(min)+parseFloat(max)/2)+1.78) * (Math.pow(parseFloat(max)-parseFloat(min), 0.5) )* 19.66).toFixed(1) } mm </h2> 
          </Col> 
          </Row> 
          </NotificationsContainer> 
 
          <NotificationsContainer> 
          <span className="notiTitle">Estado del {tipoCultivo} </span> 
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
 
export default Graficos 
