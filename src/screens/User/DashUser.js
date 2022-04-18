import React, {useState, useEffect, useCallback} from 'react'
import FadeIn from 'react-fade-in';
import axios from 'axios';
import Water from '../../components/Animations/Water'
import { Container, Row, Col } from 'react-grid-system';
import Loading from '../../components/Loading'
import Notifications from '../Notifications'
import {WeatherUserContainer, NotificationsContainer} from '../styles'
import WeatherStation from "../../components/WeatherStation/WeatherStation";



const historialUrl='localhost:3000/api/historial/all'
const tablaRadiacion = [
  { mes : '04',
    hora_inicio: "08:00",
    hora_final: "08:59",
    radiacion: 11.95,
    },
  { mes : '04',
    hora_inicio: "09:00",
    hora_final: "12:59",
    radiacion: 18.29,
    },
  { mes : '04',
    hora_inicio: "13:00",
    hora_final: "16:59",
    radiacion: 23.89,
    },
  { mes : '04',
    hora_inicio: "17:00",
    hora_final: "17:59",
    radiacion: 21.80,
    },
  { mes : '04',
    hora_inicio: "18:00",
    hora_final: "18:59",
    radiacion: 9.91,
    },
  { mes : '03',
    hora_inicio: "07:00",
    hora_final: "07:59",
    radiacion: 6.08,
    },
      { mes : '03',
      hora_inicio: "08:00",
      hora_final: "08:59",
      radiacion: 20.69,
      },
  { mes : '03',
    hora_inicio: "09:00",
    hora_final: "09:59",
    radiacion: 24.39,
    },
  { mes : '03',
    hora_inicio: "10:00",
    hora_final: "10:59",
    radiacion: 27.18,
    },
  { mes : '03',
    hora_inicio: "11:00",
    hora_final: "16:59",
    radiacion: 29.35,
    },
  { mes : '03',
    hora_inicio: "17:00",
    hora_final: "17:59",
    radiacion: 26.51,
    },
    { mes : '03',
    hora_inicio: "18:00",
    hora_final: "18:59",
    radiacion: 23.59,
    },
    { mes : '03',
    hora_inicio: "19:00",
    hora_final: "19:59",
    radiacion: 3.96,
    }
]
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
  const [radiacion, setRadiacion] = useState();
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
        const largo = reversed.length-20
        const inicio = reversed.length-50
        const datos = reversed.slice(inicio, largo);
        if(reversed && datos.length > 0){
          setTemperatura(datos.map(item => item.temperatura))
          setHumedad(datos.map(item => item.humedad))
          setPeso(datos.map(item => item.peso_actual))
          let targetRadiacion = tablaRadiacion.filter(function (currentElement) {
            if (currentElement.hora_final > datos[datos.length -1].hora.slice(0, -3) && currentElement.hora_inicio < datos[datos.length -1].hora.slice(0, -3) 
            && currentElement.mes === datos[datos.length -1].fecha.slice(5, -3)) {
              return true;
            }
          });
          setRadiacion(targetRadiacion[0].radiacion);
  
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
         loading && temperatura && humedad && peso && tipoCultivo && max && min && radiacion? (  <div>
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
          <span className="notiTitle">Asistencia de Riego </span>
      
          <Water />
       

          <span className="notiLabel">{ (0.0023 * ((parseFloat(min)+parseFloat(max)/2)+1.78) * (Math.pow(parseFloat(max)-parseFloat(min), 0.5) )* (parseFloat(radiacion))).toFixed(2) } mm</span>
   
          </NotificationsContainer>

          <NotificationsContainer>
          <span className="notiTitle">Estado del {tipoCultivo} </span>
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
