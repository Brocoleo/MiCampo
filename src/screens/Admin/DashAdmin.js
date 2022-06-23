import React, {useEffect, useState}from 'react'
import axios from "axios";
import Cookies from "js-cookie";
import FadeIn from 'react-fade-in';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';
import  {CardUsers, CardEstaciones, DataUsers, DataEstacion,DataSensores,DataLabel, CardSensores,CardLink} from '../styles'
import CardAdmin from '../../components/Admin/CardAdmin/CardAdmin';
import Users from '../../components/Animations/Users';
import Estaciones from '../../components/Animations/Estaciones';
import Sensores from '../../components/Animations/Sensores';
import ChatBot from 'react-simple-chatbot';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import avatar from "../../assets/avatar.png" 

const DashAdmin = () => {
  const usuariosURL= 'https://citra-sensores.herokuapp.com/api/users/'
  const sensoresURL= 'https://citra-sensores.herokuapp.com/api/component/paginacion'
  const historialURL= 'https://citra-sensores.herokuapp.com/api/historial/all'
  const [nroUsuarios, setNroUsuarios] = useState();
  const [nroSectores, setNroSectores] = useState();
  const [didMount, setDidMount] = useState(true);
  const [nroDatos, setNroDatos] = useState();
  const token = Cookies.get("access");
  const nombre = Cookies.get("nombre");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {headers: { Authorization: `Bearer ${token}` }};
  console.disableYellowBox = true;

  const BotLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  text-decoration: none;
  border-radius:20px;
  font-weight: 200;
  padding: 10px;
  padding-left:70px;
  padding-right:70px;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  transition: 0.2s ease-in-out;
  color: #000;
  cursor: pointer;
  background:#fff ;
 
`;
 
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Titillium Web',
  headerBgColor: '#031648',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#3E497A',
  botFontColor: '#fff',
  userBubbleColor: '#334257',
  userFontColor: '#fff',
};
  useEffect(() => {
    async function fetchData() {
      //Obtener Usuarios
      axios.get(usuariosURL,config).then((response) => {
       setNroUsuarios(Object.keys(response.data).length)
      });
      //Obtener Sectores
      axios.get(sensoresURL,config).then((response) => {
      setNroSectores((response.data.total))
      });  
      //Obtener Historial
      axios.get(historialURL,config).then((response) => {
        setNroDatos(Object.keys(response.data).length)
        }); 
      }
      if(nroUsuarios && nroDatos && nroSectores){
        setDidMount(false)
      }
      if(didMount){
        fetchData();
      }
    }, [nroUsuarios, nroDatos, nroSectores, config, didMount])
    const steps = [
      {
          id: '1',
          message:  `Hola ${nombre}, Bienvenid@ a la plataforma de monitoreo y asistencia para
          gestionar, elija una de las secciones: `,
          trigger: 2,
      },
      
      {
        id: '2',
        component: (
          <div className="botSecciones"> <BotLink to='/admin/monitoreo'>MONITOREO </BotLink>
           </div>
        ),
        asMessage: true,
        trigger: 3,
      },
      {
        id: '3',
        component: (
          <div ><BotLink to='/admin/usuarios'>USUARIOS</BotLink>
           </div>
        ),
        asMessage: true,
        trigger: 4,
      },
      {
        id: '4',
        component: (
          <FadeIn><div ><BotLink to='/admin/sensores'>SENSORES</BotLink>
           </div></FadeIn>
        ),
        asMessage: true,
        end: true,
      },
      
    ];

    const [opened, setOponed] = useState(false);
    const toggleFloating = () => {
      setOponed(!opened);
    };

    return (
        <div className="margenTop">
          <FadeIn>
          <h1 className="bienvenida">Hola, Bienvenido al CITRA</h1>
          <div className="subtitulo">Administración de las estaciones meteorológicas para monitoreo y asistencia de riego.</div>
          </FadeIn>
        <Grid container spacing={6}> 
        <FadeIn>
        <Grid item xs>
        <CardLink to="/admin/usuarios">
          <CardUsers>
            <CardAdmin title="USUARIOS"/>
            <Users />
            <DataUsers>
            <CountUp  start={0} end={nroUsuarios} duration={1} />
            </DataUsers>
            <DataLabel> Registrados</DataLabel>
          </CardUsers> 
        </CardLink> 
        </Grid>
        </FadeIn>

        <FadeIn>
          <Grid item xs>
          <CardLink to="/admin/sensores">
          <CardEstaciones>
            <CardAdmin title="MONITOREO"/>
            <Estaciones />
            <DataEstacion>
            <CountUp  start={0} end={nroDatos} duration={1} />
            </DataEstacion>
            <DataLabel>Datos Climáticos</DataLabel>
          </CardEstaciones>
          </CardLink>   
          </Grid>
          </FadeIn>

          <FadeIn>
          <Grid item xs>
          <CardLink to="/admin/sectores">
          <CardSensores>
            <CardAdmin title="SENSORES"/>
            <Sensores />
            <DataSensores>
            <CountUp  start={0} end={nroSectores} duration={1} />
            </DataSensores>
            <DataLabel> Desplegados</DataLabel>
          </CardSensores>
          </CardLink> 
          </Grid>
          </FadeIn>

                
        </Grid>
        <ThemeProvider theme={theme}>
          <ChatBot 
          headerTitle="Asistente Virtual 👋"
          botAvatar = {avatar}
          steps={steps}
          floating={true}
          style= {{height: '80vh', width: '350px'}}
          opened={opened}
          toggleFloating={toggleFloating}
          bubbleStyle= {{maxWidth: "65%"}}
          />
           </ThemeProvider>
        </div>
    )
}

export default DashAdmin
