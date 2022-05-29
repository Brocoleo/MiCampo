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

const DashAdmin = () => {
  const usuariosURL= 'http://localhost:3000/api/users/'
  const sensoresURL= 'http://localhost:3000/api/component/paginacion'
  const historialURL= 'http://localhost:3000/api/historial/all'
  const [nroUsuarios, setNroUsuarios] = useState();
  const [nroSectores, setNroSectores] = useState();
  const [didMount, setDidMount] = useState(true);
  const [nroDatos, setNroDatos] = useState();
  const token = Cookies.get("access");
  const nombre = Cookies.get("nombre");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {headers: { Authorization: `Bearer ${token}` }};

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
  font-family: 'Nunito', sans-serif;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #000;
  cursor: pointer;
  background:#fff ;
 
`;
 
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
          message:  `Hola ${nombre}, Bienvenid@ a la plataforma de monitoreo y asistencia, para
          gestionar eliga una de las secciones: `,
          trigger: 2,
      },
      
      {
        id: '2',
        component: (
          <div className="botSecciones"> <BotLink to='/admin/sensores'>MONITOREO </BotLink>
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
          <FadeIn><div ><BotLink to='/admin/sectores'>SENSORES</BotLink>
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
          <div className="subtitulo">Administracion de las estaciones meteorologicas para monitoreo y asistencia de riego</div>
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
            <DataLabel>Datos Climaticos</DataLabel>
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
          headerTitle="Asistente Virtual 💧"
          steps={steps}
          floating={true}
          opened={opened}
          toggleFloating={toggleFloating}
          bubbleStyle= {{maxWidth: "65%"}}
          />
           </ThemeProvider>
        </div>
    )
}

export default DashAdmin
