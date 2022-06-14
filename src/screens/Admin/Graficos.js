import React, {useState, useEffect} from 'react' 
import FadeIn from 'react-fade-in'; 
import axios from 'axios'; 
import LineChart from "../../components/LineChart/LineChart"; 
import Water from '../../components/Animations/Water' 
import  { ChartContainer} from '../styles' 
import Cookies from "js-cookie"; 
import avatar from "../../assets/avatar.png"
import { Container, Row, Col } from 'react-grid-system'; 
import Loading from '../../components/Loading' 
import Notifications from '../Notifications' 
import {WeatherContainer, NotificationsContainer} from '../styles' 
import WeatherStation from "../../components/WeatherStation/WeatherStation";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components'; 
import {makeStyles} from '@material-ui/core/styles';
import styled from 'styled-components';
import { Modal, Button, TextField} from '@material-ui/core';
import CountUp from 'react-countup';
import Location from '../../components/Location/Location';
import ReactSpeedometer from "react-d3-speedometer"

 
  const historialUrl='https://citra-sensores.herokuapp.com/api/historial/all' 
  const promUrl='https://citra-sensores.herokuapp.com/api/historial/promedio/' 
  const horasUrl='https://citra-sensores.herokuapp.com/api/radiacion/unMes/' 

  const ButtonModelo = styled(Button)({
    textTransform: 'none',
    fontSize: '14px',
    marginTop: '14px',
    padding: '-1px 46px',
    fontWeight: '300',
    color: '#fff',
    backgroundColor: '#3E497A',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
      boxShadow: 'none',
    }
  });

  const ButtonChat = styled(Button)({
    color: '#fff',
    backgroundColor: '#3E497A',
  });

  const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      fontFamily: `'Titillium Web', sans-serif`,
      borderRadius: '25px',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #0F044C',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    btnDelete:{
      cursor: 'pointer',
      padding: '10px',
      paddingLeft: '15px',
      paddingRight: '15px',
      width: '23px',
      color: '#E02401',
      borderRadius: '20px',
      backgroundColor: '#EDEDED ',
      '&:hover': {
        backgroundColor: '#BDBDBD',
        color: '#B31C00',  
      },
      [theme.breakpoints.up('xl')]: {
        width: '28%',
      },
    }, 
    btnEditar:{
      cursor: 'pointer',
      width: '23px',
      padding: '10px',
      paddingLeft: '15px',
      paddingRight: '15px',
      marginLeft: '34%',
      color: '#F78812',
      borderRadius: '20px',
      backgroundColor: '#EDEDED',
      '&:hover': {
        backgroundColor: '#BDBDBD',
         color: '#C56C0E',
        
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: '24%',
        width: '28%',
      },
      
    }, 
    inputMaterial:{
      width: '100%',
      fontFamily: `'Titillium Web', sans-serif`,
      fontSize: '1rem',
      marginTop: '20px'
    },
    tituloEditar:{
        width: '88%',
        color: '#fff',
        borderRadius: '30px',
        backgroundColor: '#0F044C',
        paddingLeft: '30px',
        paddingTop: '10px',
        paddingBottom: '10px'
      }
      ,
      customTable: {
        "& .MuiTableCell-sizeSmall": { 
          padding: '0px ' ,
          
        }
      },
      btnAgregar:{
        cursor: 'pointer',
        color: '#fff',
        background : '#289672',
        marginRight:'10px',
        boxShadow: '0 3px 6px 0 #134E5E',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#1E6F5C',
            borderColor: '#1E6F5C',
            boxShadow: '0 3px 6px 0 #134E5E',
          },
      },
      btnCancelar:{
        cursor: 'pointer',
        color: '#fff',
        background  : '#E02401',
        boxShadow: '0 3px 6px 0 #134E5E',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#51050F',
            borderColor: '#51050F',
            boxShadow: '0 3px 6px 0 #134E5E',
          },
      }
  })); 

  


  const Graficos = () => { 
    const styles= useStyles();
    const sensor = Cookies.get("sensor"); 
    const token = Cookies.get("access");
    const config = {headers: { Authorization: `Bearer ${token}` }};  
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
    const [fecha, setFecha] = useState();
    const [dia, setDia] = useState();
    const [pes, setPes] = useState(); 
    const [min, setMin] = useState(); 
    const [max, setMax] = useState(); 
    const [hrs, setHrs] = useState(); 
    const [radiacion, setRadiacion] = useState();
    const [promTemp, setPromTemp] = useState();
    const [evapotrans, setEvapotrans] = useState();
    const [didMount, setDidMount] = useState(true);
    const [maxPeso, setMaxPeso] = useState(); 
    const [maxMin, setMaxMin] = useState(); 
    const [modelo, setModelo] = useState('Hergreaves'); 
    const [latitud, setLatitud] = useState(); 
    const [longitud, setLongitud] = useState(); 
    const [modalEditar, setModalEditar]=useState(false);
    

    const theme = {
      background: '#f5f8fb',
      fontFamily: 'Titillium Web',
      headerBgColor: '#031648',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor: '#3E497A',
      botFontColor: '#fff',
      userBubbleColor: '#DEA057',
      userFontColor: '#fff',
    };

    const bodyEditar=(

      <div className={styles.modal}>
        <FadeIn>
        <h2 className={styles.tituloEditar}>Coloca tu ubicacion</h2>
        <TextField name="latitud" className={styles.inputMaterial} label="Latitud"  value={latitud} variant="outlined"/>
        <br />
        <TextField name="longitud" className={styles.inputMaterial} label="Longitud"  value={longitud} variant="outlined"/>

        <br />
       
        <br />
        <br /><br />
        <div align="right">
          <Button className={styles.btnAgregar} >Editar</Button>
          <Button className={styles.btnCancelar} >Cancelar</Button>
        </div>
        </FadeIn>
      </div>
    )
  
      
      
    
  const steps = [
      {
          id: '1',
          message:  `${nombre}, soy el asistente virtual selecciona algunas de las opciones de monitoreo`,
          trigger: 2,
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'Info Cultivo 🌱', trigger: '3' },
          { value: 2, label: 'Consumo Hidrico 💧', trigger: '4' }
        ],
      },
      {
        id: '3',
        message: `Tipo de cultivo: ${tipoCultivo}`,
        trigger: '13',
      },
      {
        id: '4',
        message: 'Elige una opcion del consumo hidrico de tu cultivo',
        trigger: '5',
      },
      {
        id: '5',
        options: [
          { value: 1, label: 'Estimar Consumo ✏️', trigger: '8' },
          { value: 2, label: 'Elegir Modelo 🔍', trigger: '10' }
        ],
      },
      {
        id: '6',
        options: [
          { value: 1, label: 'Volver', trigger: '2' },
          { value: 2, label: 'Terminar', trigger: '7' }
        ],
      },
      {
        id: '7',
        message: `Adios :)`,
        end: true,
      },
      {
        id: '8',
        message: `El cultivo necesita ${evapotrans} mm de agua durante el dia.`,
        trigger: '5',
      },
      {
        id: '9',
        options: [
          { value: 1, label: 'Volver', trigger: '5' },
          { value: 2, label: 'Terminar', trigger: '7' }
        ],
      },
      {
        id: '10',
        component: (
          <div ><ButtonChat onClick={()=>cambiarModelo('Hergreaves')}>Hergreaves 🌡️</ButtonChat> 
           </div>
        ),
        asMessage: true,
        trigger: 11,
      },
      {
        id: '11',
        component: (
          <FadeIn><div ><ButtonChat onClick={()=>cambiarModelo('Blaney Criddle')}>Blaney Criddle ☀️</ButtonChat> 
           </div></FadeIn>
        ),
        asMessage: true,
        trigger: 12,
      },
      {
        id: '12',
        options: [
          { value: 1, label: 'Volver', trigger: '2' },
          { value: 2, label: 'Terminar', trigger: '7' }
        ],
      },
      {
        id: '13',
        message: `💧 Humedad: ${hum}%`,
        trigger: '14',
      },
      {
        id: '14',
        message: `🌡️ Temperatura: ${temp}°C`,
        trigger: '15',
      },
      {
        id: '15',
        message: `⚖️ Peso: ${pes}gr`,
        trigger: '6',
      },
   
    ];

    const getUserLocation = async() =>{
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude)
          setLongitud(position.coords.longitude)
        }
      )
    }
    
    const cambiarModelo=(value)=>{
      if(value === 'Hergreaves'){
        const media = (parseFloat(min)+parseFloat(max))/2
        const resta = parseFloat(max)-parseFloat(min)
        const op1 = 0.0023 * ((media)+1.78) 
        const op2 = (Math.pow(resta, 0.5))
        setEvapotrans((op1* op2* radiacion).toFixed(1))
        setModelo('Hergreaves')
       
      }if(value === 'Blaney Criddle'){
        const op1 = hrs*(promTemp * 0.46)+8.13
        const op2 = parseInt(fecha.slice(8,10))
        setEvapotrans(((op1)/(op2)).toFixed(1))
        setModelo('Blaney Criddle')
      }
    }

    const switchModelo=()=>{
      if(modelo === 'Hergreaves'){
        const op1 = hrs*(promTemp * 0.46)+8.13
        const op2 = parseInt(fecha.slice(8,10))
        setEvapotrans(((op1)/(op2)).toFixed(1))
        setModelo('Blaney Criddle')
      }if(modelo === 'Blaney Criddle'){
        const media = (parseFloat(min)+parseFloat(max))/2
        const resta = parseFloat(max)-parseFloat(min)
        const op1 = 0.0023 * ((media)+1.78) 
        const op2 = (Math.pow(resta, 0.5))
        setEvapotrans((op1* op2* radiacion).toFixed(1))
        setModelo('Hergreaves')
      }
    }

    const [opened, setOponed] = useState(false);
    const toggleFloating = () => {
      setOponed(!opened);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ObtenerHistorial = () => {
      axios.get(historialUrl, config).then((response) => {   
        const respuesta =response.data 
        let filtrado = respuesta.filter(dato=>dato.nombre_sensor === `${sensor}`); 
        filtrado = filtrado.reverse(); 
        const largo = filtrado.length 
        const inicio = filtrado.length-30 
        const datos = filtrado.slice(inicio, largo);
        setFecha(filtrado[filtrado.length-30].fecha)
        ObtenerPromedio(sensor, filtrado[filtrado.length-30].fecha)
        let mes  = filtrado[filtrado.length-30].fecha.slice(5, -3)
        let dia  = filtrado[filtrado.length-30].fecha.slice(8, 11)
        setDia(parseInt(dia)+((parseInt(mes)-1)*31))
        ObtenerRadiacionHrs(mes)
        ObtenerRadiacion()
        if(filtrado && datos.length > 0 ){ 
          setMaxMin(filtrado.map(item => item.temperatura)) 
          if(maxMin){
            setMin(Math.min(...maxMin).toFixed(1)) 
            setMax(Math.max(...maxMin).toFixed(1)) 
          } 
          const pesos = datos.map(item => item.peso_actual) 
          if(pesos){
            setMaxPeso(Math.max(...pesos).toFixed(1)) 
          }
          setIndices(datos.map(item => item.hora.slice(0, -3)))  
          setTemperatura(datos.map(item => item.temperatura))  
          setHumedad(datos.map(item => item.humedad)) 
          setPeso(datos.map(item => item.peso_actual)) 
          if(temperatura){
            setTemp(temperatura[temperatura.length - 30].toFixed(1))
          }
          if(humedad){
            setHum(humedad[humedad.length - 30].toFixed(1))
          }
          if(peso){
            setPes(peso[peso.length - 30].toFixed(1))
          }
        }else{ 
          setVerGraficas(false) 
        } 
       
     })
     if(evapotrans){

     }else{
      if(min && max && radiacion && promTemp && fecha && hrs && modelo){
        const media = (parseFloat(min)+parseFloat(max))/2
        const resta = parseFloat(max)-parseFloat(min)
        const op1 = 0.0023 * ((media)+1.78) 
        const op2 = (Math.pow(resta, 0.5))
        setEvapotrans((op1* op2* radiacion).toFixed(1))
      }
     }
     
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const ObtenerPromedio = (nombre_sensor,fecha) => {
        axios.get(promUrl+nombre_sensor + '/'+fecha,config).then((response) => {
          setPromTemp(response.data.promedio[0].prom)
         
          }); 
      }

      const ObtenerRadiacion = () => {
      const varphi = (Math.PI/180) *  latitud
      const dr = 1+ (0.033 * Math.cos(((2*Math.PI*dia)/(365))))
      const delta = 0.409 * Math.sin((((2*Math.PI)/(365))*dia)-1.39)
      const ws = Math.acos(-Math.tan(varphi) * Math.tan(delta))
      const op1 = ((24*60)/(Math.PI))*0.082* dr
      const op2 = ws*Math.sin(varphi)* Math.sin(delta)+Math.cos(varphi)* Math.cos(delta)*Math.sin(ws)
      setRadiacion((op1)*(op2)*0.408)
      }

      const ObtenerRadiacionHrs = (mes) => {
        axios.get(horasUrl+mes,config).then((response) => {
          const dia = response.data.mes
          const inicio = dia[3].hora_inicio.slice(0, -3)
          const final = dia[dia.length-2].hora_inicio.slice(0, -3)
          setHrs(parseInt(final)-parseInt(inicio))
         
          }); 
      }

      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
      
    useEffect(() => {
 
      if(humedad && min && max && peso && sensor && maxMin && temperatura && radiacion){
        setDidMount(false)
      }
      if(didMount){
        getUserLocation()
        ObtenerHistorial()
      }
      else{

      } 
      
      
    }, [modelo, humedad, min, max, peso, sensor, maxMin, temperatura, token,didMount, radiacion, ObtenerHistorial, ObtenerPromedio, promTemp, fecha, hrs])
   
 
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
 
   
    return (<> 
    { verGraficas ? ( 
         loading && temperatura && humedad && peso  && evapotrans  && !didMount && maxPeso? (  <div> 
          <Container> 
          <Row> 
          <Col> 
      <FadeIn className='tipoGrafica'> 
          <WeatherContainer > 
          <WeatherStation title={` Sensor ` +sensor} tipo={tipoCultivo} temperatura={temperatura[temperatura.length - 30]}  
          humedad={humedad[humedad.length -30]} peso={peso[peso.length -30]} 
    /> 
          </WeatherContainer>  
          <NotificationsContainer> 
          <span className="notiTitle">Estimacion Hidrica </span> 
          <Row> 
          <Col> 
          <Water />
          </Col> 
          <Col> 
          <CountUp className="notiLabel" start={0} end={evapotrans}  decimal=","
          decimals={1} suffix=" mm"
           duration={2} />
          <ButtonModelo onClick={()=>switchModelo()}>{modelo}</ButtonModelo> 
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
                return  <Container> <FadeIn> <Row> <Location latitud={latitud} longitud={longitud} funcion={abrirCerrarModalEditar} /> { humedad && humedad[0]!==null? (<ChartContainer><LineChart title='Humedad' data={humedadLine} /></ChartContainer>) : (<div></div>)} 
                { temperatura && temperatura[0]!==null? (<ChartContainer><LineChart title='Temperatura' data={temperaturaLine} /> </ChartContainer>) : (<div></div>)} 
                { <div style={{
                    width: "380px",
                    height: "200px",
                    background: "#fff",
                    padding: "20px",
                    borderRadius: '20px',
                    marginLeft: '50px',
                    boxShadow: '0 9px 12px 0 #031648'
                  }}>
                    <ReactSpeedometer
                      fluidWidth={false}
                      minValue={0}
                      maxValue={maxPeso}
                      value={parseInt(pes)}
                      // eslint-disable-next-line no-template-curly-in-string
                      currentValueText="Peso: ${value} gr"
                      needleTransitionDuration={4000}
                      needleColor="#0F044C"
                    />
                  </div>}  
              </Row> </FadeIn> </Container> 
              default: 
                return <Container> <FadeIn>  <Row> <Location latitud={latitud} longitud={longitud} />{ humedad && humedad[0]!==null? (<Col sm={6}><ChartContainer><LineChart title='Humedad' data={humedadLine} /></ChartContainer></Col>) : (<div></div>)} 
                { temperatura && temperatura[0]!==null? (<Col sm={6}><ChartContainer><LineChart title='Temperatura' data={temperaturaLine} /> </ChartContainer></Col>) : (<div></div>)} 
                {<div style={{
                    width: "380px",
                    height: "200px",
                    background: "#fff",
                    padding: "20px",
                    borderRadius: '20px',
                    marginLeft: '50px',
                    boxShadow: '0 9px 12px 0 #031648'
                  }}>
                    <ReactSpeedometer
                      fluidWidth={false}
                      minValue={0}
                      maxValue={maxPeso}
                      value={parseInt(pes)}
                      textColor="#000"
                      // eslint-disable-next-line no-template-curly-in-string
                      currentValueText="Peso: ${value} gr"
                      needleTransitionDuration={4000}
                      needleColor="#0F044C"
                    />
                  </div>}   </Row>  </FadeIn> </Container> } })()} 
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
          headerTitle=" Asistente Virtual 👋"
          bubbleStyle= {{maxWidth: "65%"}}
          botAvatar = {avatar}
          steps={steps}
          style= {{height: '80vh', width: '350px'}}
          floating={true}
          opened={opened}
          toggleFloating={toggleFloating}
          />
          <Modal
       open={modalEditar}
       onClose={abrirCerrarModalEditar}>
          {bodyEditar}
       </Modal>
           </ThemeProvider>

           ):(<></> ) 
          } 
          
    </>    
    ) 
} 
 
export default Graficos 
