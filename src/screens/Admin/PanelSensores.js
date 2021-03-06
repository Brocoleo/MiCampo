import React, {useEffect, useState, useCallback } from 'react';  
import Card from '@mui/material/Card';  
import CardContent from '@mui/material/CardContent';  
import { CardActionArea } from '@mui/material';  
import Cookies from "js-cookie";  
import { Modal, Button} from '@material-ui/core';
import { Container, Row, Col } from 'react-grid-system';  
import axios from 'axios';  
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import FadeIn from 'react-fade-in'; 
import { ThemeProvider as StyledTheme } from 'styled-components';
import avatar from "../../assets/avatar.png"
import ChatBot from 'react-simple-chatbot';
import { styled } from '@mui/material/styles'; 
import {makeStyles} from '@material-ui/core/styles';  
import Typography from '@mui/material/Typography';  
import { useNavigate } from "react-router-dom";  
import Loading from '../../components/Loading' 
import Aviso from '../../components/Animations/Aviso' 

  
const useStyles = makeStyles((theme) => ({  

  modal: {
    position: 'absolute',
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
  card: {  
    borderRadius: 60,  
    transition: "0.3s",  
    border: '6px solid #fff',  
    "&:hover": {  
      boxShadow: "0 16px 60px -12.125px rgba(0,0,0,0.3)",  
      opacity: 0.9  
    }  
  },  
  info: {  
    backgroundColor: '#0F044C', 
    color: '#fff',  
  },   
  tituloEstacion:{  
    textTransform: 'uppercase'
  },  
  cultivo: {  
    color: '#000',  
    borderRadius: '90px',  
    backgroundColor: '#fff',  
    textTransform: 'uppercase',
  },  
  sensor: {  
    textTransform: 'uppercase',  
    color: '#272727'  
  },  
  image: {  
    width: 250,  
    height: 160,  
    overflow: "hidden",  
    borderWidth: 3,  
  }, 
  tituloAviso:{
      width: '80%',
      textAlign: 'center',
      color: '#fff',
      borderRadius: '30px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingTop: '10px',
      paddingBottom: '10px'
    }, 
    bodyAviso:{
        width: '90%',
        paddingLeft: '10px',
        textAlign: 'center',
        fontVariantCaps: 'all-petite-caps'
        
      }
}));  

const ButtonOK = styled(Button)({
  marginLeft: '60%',
  textTransform: 'none',
  fontSize: '1.2rem',
  padding: '6px 15px',
  border: '1px solid',
  fontWeight: '300',
  textShadow: '1px 1px #000',
  boxShadow: '0 6px 9px 0 #134E5E',
  color: '#fff',
  backgroundColor: '#0F044C',
  borderColor: '#0F044C',
  '&:hover': {
    backgroundColor: '#120b38',
    borderColor: '#120b38',
    boxShadow: 'none',
  }
});
  
const theme = createMuiTheme({
  typography: {
   "fontFamily": `'Titillium Web', sans-serif`,
   "fontSize": 12,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

const chattema = {
  background: '#f5f8fb',
  headerBgColor: '#031648',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#3E497A',
  botFontColor: '#fff',
  userBubbleColor: '#DEA057',
  userFontColor: '#fff',
};
  
const token = Cookies.get("access");   
const config = {headers: { Authorization: `Bearer ${token}` }};   
const PanelSensores = () => {  
  const [opened, setOponed] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [modalAviso, setModaAviso]=useState(false);
  const navigate = useNavigate();  
  const styles= useStyles(); 
  const graficasUrl = 'https://citra-sensores.herokuapp.com/api/historial/' 
  const estacionUrl='https://citra-sensores.herokuapp.com/api/component/paginacion'  
  const [sensores, setSensores] =useState([]); 
  const [sensor, setSensor]=useState() 
  const [didMount, setDidMount] = useState(true);
  
  const steps = [
    {
        id: '1',
        message:  `Est??s en la vista de monitoreo, aqu?? puedes ver los sensores disponibles para visualizar la informaci??n, los gr??ficos y la estimaci??n h??drica de consumo.`,
        end: true,
    },
   
  ];
  const abrirCerrarModalAviso=()=>{
    setModaAviso(!modalAviso);
  }

  const bodyAviso=(
    <div className={styles.modal}>
      <FadeIn>
      <h2 className={styles.tituloAviso}>Sensor {sensor} sin historial </h2>
      <Aviso/>
      <p className={styles.bodyAviso}>Para monitorear la estacion necesita registros historicos de las variables climatologicas</p>
      <div align="right">
        <ButtonOK onClick={()=>abrirCerrarModalAviso()}>OK</ButtonOK>

      </div>
      </FadeIn>
    </div>
  )

  const fetchSensores = useCallback(async () => {  
    if(config){
      axios.get(estacionUrl, config).then((response) => {   
        var count = Object.keys(response.data).length;  
        if(count===0){  
          setSensores([{  
            nombreComponente: '',  
            tipoCultivo: 'Sin Sensores'  
          }]);  
        }else{  
          setSensores(response.data.componentes)   
        }if(sensores){
          setLoading(true) 
        }}  
        );  
    }
      
  }, [ sensores])  
  
  useEffect(() => {  
    if(sensores){
      setDidMount(false)
    }
    if(didMount){
      fetchSensores()  
    }
    else{
    }
    
  }, [fetchSensores, sensores, didMount])  
  
  const toggleFloating = () => {
    setOponed(!opened);
  };
 
  const VerGraficas = (sensor, tipo) =>{  
    setSensor(sensor);
    Cookies.set("sensor", sensor );  
    Cookies.set("tipo", tipo );  
    axios.get(graficasUrl, config).then((response) => { 
    const respuesta =response.data.historial
    let filtrado = respuesta.filter(dato=>dato.nombre_sensor === `${sensor}`);
    let aux;
    if(filtrado.length > 0){
      aux = false
    }else{
      aux = true}
    aux? ( setModaAviso(!modalAviso)) : ( navigate('/admin/graficos'))
    }); }  
  
  return (  
  <>  
  { loading ? (  <><FadeIn>  
    <h1 className="bienvenidaSensores">SELECCIONA UN SENSOR PARA MONITOREAR</h1>  
    </FadeIn>  
    <br />  
    <br />  
    <ThemeProvider theme={theme}>
      <Container >  
        <Row>  
            {sensores && sensores.map((anObjectMapped, index) => {    
              return (  
              <Col key={index}>  
                    <FadeIn>  
              <Card sx={{ width: 250 ,  borderRadius: 6, margin: 1, backgroundColor: '#fff',}} className={styles.card}>  
                <CardActionArea onClick={()=>VerGraficas(anObjectMapped.nombre_sensor, anObjectMapped.nombre_cultivo)}>  
                <img className={styles.image} src={require(`../../assets/${anObjectMapped.nombre_cultivo}.jpg`)} alt="" width="240" height="200"/>  
                  <CardContent className={styles.info}>  
                  <Typography gutterBottom variant="h6" className={styles.cultivo} component="div">  
                  {anObjectMapped.nombre_cultivo}  
                  </Typography>  
                  <Typography variant="body1" className={styles.sensor} color="#fff">  
                  {'Sensor ' + anObjectMapped.nombre_sensor}   
                  </Typography>  
                  </CardContent>  
                </CardActionArea>  
              </Card>  
              </FadeIn>  
              </Col>  
                
            );    })}             
  
            <br /><br />  
            </Row>  
      </Container> 
      </ThemeProvider>


      <StyledTheme theme={chattema}>
    <ChatBot 
    headerTitle="Asistente Virtual ????"
    botAvatar = {avatar}
    style= {{height: '80vh', width: '350px'}}
    steps={steps}
    floating={true}
    opened={opened}
    toggleFloating={toggleFloating}
    bubbleStyle= {{maxWidth: "65%"}}
    />
     </StyledTheme>
      <Modal
       open={modalAviso}
       onClose={abrirCerrarModalAviso}>
          {bodyAviso}
       </Modal></>):(<div className="loading"><Loading /> </div>)}  
        
  
    </>  
  )  
}  
  
export default PanelSensores  
