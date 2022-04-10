import React, {useState, useEffect, useCallback} from 'react'
import FadeIn from 'react-fade-in';
import axios from 'axios';
import LineChart from "../../components/LineChart/LineChart";
import  { ChartContainer} from '../styles'
import Cookies from "js-cookie";
import { Container, Row, Col } from 'react-grid-system';
import Loading from '../../components/Loading'
import Notifications from '../Notifications'
import {WeatherAdminContainer, NotificationsContainer} from '../styles'
import WeatherStation from "../../components/Admin/WeatherStation/WeatherStation";



  const historialUrl='https://sensores-citra.herokuapp.com/api/historial/all'
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

    const getHistorial = useCallback(async () => {
      const config = {headers: { Authorization: `Bearer ${token}` }};
      axios.get(historialUrl, config).then((response) => {
        const respuesta =response.data
        let filtrado = respuesta.filter(dato=>dato.nombre_sensor === `${sensor}`);
        console.log(filtrado)
        const largo = filtrado.length
        const inicio = filtrado.length-30
        const datos = filtrado.slice(inicio, largo);
        if(filtrado && datos.length > 0){
          setIndices(datos.map(item => item.hora.slice(1, -3))) 
          setTemperatura(datos.map(item => item.temperatura)) 
          setHumedad(datos.map(item => item.humedad))
          setPeso(datos.map(item => item.peso_actual))
          console.log(peso)
          console.log(temperatura)
          console.log(humedad)

        }else{
          setVerGraficas(false)
        }

     });
    }, [ sensor, token, humedad, peso, temperatura])

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
         loading && temperatura && humedad && peso? (  <div>
          <Container>
          <Row>
          <Col>
      <FadeIn className='tipoGrafica'>
          <WeatherAdminContainer >
          <WeatherStation title={` Sensor ` +sensor} tipo={tipoCultivo} temperatura={temperatura[temperatura.length - 1]} 
          humedad={humedad[humedad.length -1]} peso={peso[peso.length -1]}
    />
          </WeatherAdminContainer>  
       
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

export default Graficos
