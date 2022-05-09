import React, {useState, useEffect} from 'react' 
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
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components'; 

const radiacion = [
  { mes : '04',
    hora_inicio: "08:00",
    hora_final: "08:59",
    radiacion: 13.13,
    },
  { mes : '04',
    hora_inicio: "09:00",
    hora_final: "12:59",
    radiacion: 19.49,
    },
  { mes : '04',
    hora_inicio: "13:00",
    hora_final: "16:59",
    radiacion: 24.03,
    },
  { mes : '04',
    hora_inicio: "17:00",
    hora_final: "17:59",
    radiacion: 21.60,
    },
  { mes : '04',
    hora_inicio: "18:00",
    hora_final: "18:59",
    radiacion: 9.91,
    }
]
 
  const historialUrl='http://localhost:3000/api/historial/all' 
  const Graficos = () => { 
    const sensor = Cookies.get("sensor"); 
    const token = Cookies.get("access"); 
    const nombre = Cookies.get("nombre");
    const tipoCultivo = Cookies.get("tipo"); 
    const [loading, setLoading] = useState(false); 
    const [verGraficas, setVerGraficas] = useState(true); 
    const grafico = 'linea'; 
    const [indices, setIndices] = useState(); 
    const [temperatura, setTemperatura] = useState(); 
    const [temp, setTemp] = useState(); 
    const [humedad, setHumedad] = useState(); 
    const [hum, setHum] = useState();
    const [peso, setPeso] = useState(); 
    const [pes, setPes] = useState(); 
    const [min, setMin] = useState(); 
    const [max, setMax] = useState(); 
    const [evapotrans, seEvapotrans] = useState();
    const [didMount, setDidMount] = useState(true);
    const [maxMin, setMaxMin] = useState(); 
    

    const theme = {
      background: '#f5f8fb',
      fontFamily: 'Helvetica Neue',
      headerBgColor: '#031648',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor: '#3E497A',
      botFontColor: '#fff',
      userBubbleColor: '#DEA057',
      userFontColor: '#fff',
    };

    
      
      
    
  const steps = [
      {
          id: '1',
          message:  `${nombre}, soy el asistente virtual selecciona algunas de las opciones de monitoreo`,
          trigger: 2,
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'Informacion Cultivo', trigger: '3' },
          { value: 2, label: 'Consumo Hidrico', trigger: '4' }
        ],
      },
      {
        id: '3',
        message: `Tu cultivo de ${tipoCultivo} tiene una humedad de ${hum}%, temperatura de ${temp}°C y esta pesando ${pes} gramos.`,
        trigger: '6',
      },
      {
        id: '4',
        message: 'Elige una opcion del consumo hidrico de tu cultivo',
        trigger: '5',
      },
      {
        id: '5',
        options: [
          { value: 1, label: 'Estimar Consumo', trigger: '8' },
          { value: 2, label: 'Elegir Modelo Hidrico', trigger: '10' }
        ],
      },
      {
        id: '6',
        options: [
          { value: 1, label: 'Elegir otra opcion', trigger: '2' },
          { value: 2, label: 'Terminar', trigger: '7' }
        ],
      },
      {
        id: '7',
        message: `Adios`,
        end: true,
      },
      {
        id: '8',
        message: `El cultivo necesita ${evapotrans} mm de agua durante el dia.`,
        trigger: '6',
      },
      {
        id: '9',
        options: [
          { value: 1, label: 'Elegir otra opcion', trigger: '5' },
          { value: 2, label: 'Terminar', trigger: '7' }
        ],
      },
      {
        id: '10',
        options: [
          { value: 'Hargreaves', label: 'Hargreaves', trigger: '11' },
          { value: 'Thornthwaite', label: 'Thornthwaite', trigger: '11' }
        ],
      },
      {
        id: '11',
        message: 'El modelo {previousValue} fue aplicado correctamente!',
        end: true,
      },
    ];
    const [opened, setOponed] = useState(false);
    const toggleFloating = () => {
      setOponed(!opened);
    };
 
    useEffect(() => {
      const config = {headers: { Authorization: `Bearer ${token}` }};
      async function fetchData() {
        axios.get(historialUrl, config).then((response) => {   
          const respuesta =response.data 
          let filtrado = respuesta.filter(dato=>dato.nombre_sensor === `${sensor}`); 
          filtrado = filtrado.reverse(); 
          const largo = filtrado.length 
          const inicio = filtrado.length-30 
          const datos = filtrado.slice(inicio, largo); 
          if(filtrado && datos.length > 0 ){ 
            setMaxMin(filtrado.map(item => item.temperatura)) 
            if(maxMin){
              setMin(Math.min(...maxMin).toFixed(1)) 
              setMax(Math.max(...maxMin).toFixed(1)) 
            }   
            setIndices(datos.map(item => item.hora.slice(0, -3)))  
            setTemperatura(datos.map(item => item.temperatura))  
            setHumedad(datos.map(item => item.humedad)) 
            setPeso(datos.map(item => item.peso_actual)) 
            if(temperatura){
              setTemp(temperatura[temperatura.length - 1].toFixed(1))
            }
            if(humedad){
              setHum(humedad[humedad.length - 1].toFixed(1))
            }
            if(peso){
              setPes(peso[peso.length - 1].toFixed(1))
            }
            if(min && max){
              seEvapotrans( (0.0023 * ((parseFloat(min)+parseFloat(max)/2)+1.78) * (Math.pow(parseFloat(max)-parseFloat(min), 0.5) )* 19.66).toFixed(1))
            }
          }else{ 
            setVerGraficas(false) 
          } 
         
       })
      }

      if(humedad && min && max && peso && sensor && maxMin && temperatura){
        setDidMount(false)
      }
      if(didMount){
        fetchData();
      }
      else{
        console.log("nada")
      }
      
      
    }, [humedad, min, max, peso, sensor, maxMin, temperatura, token,didMount])
   
 
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
         loading && temperatura && humedad && peso  && max && min && evapotrans? (  <div> 
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
          <span className="notiTitle">Estimacion Hidrica </span> 
          <Row> 
          <Col> 
          <Water /> 
          </Col> 
          <Col> 
          <h2 className="notiLabel">{ evapotrans } mm </h2> 
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
          { temp && temp[0]!==null && hum && hum[0]!==null && pes && pes[0]!==null && evapotrans? (
            <ThemeProvider theme={theme}>
          <ChatBot 
          headerTitle=" Asistente Virtual 💧"
          bubbleStyle= {{maxWidth: "65%"}}
          steps={steps}
          floating={true}
          opened={opened}
          toggleFloating={toggleFloating}
          />
           </ThemeProvider>
           ):(<></> ) 
          } 
          
    </>    
    ) 
} 
 
export default Graficos 
