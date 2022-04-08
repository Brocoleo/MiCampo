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

const DashAdmin = () => {
  const usuariosURL= 'http://localhost:3000/api/users/'
  const sensoresURL= 'http://localhost:3000/api/component/paginacion'
  const historialURL= 'http://localhost:3000/api/historial/all'
  const [nroUsuarios, setNroUsuarios] = useState();
  const [nroSectores, setNroSectores] = useState();
  const [nroDatos, setNroDatos] = useState();
  const token = Cookies.get("access");
  console.log(token)
  const config = {headers: { Authorization: `Bearer ${token}` }};


  useEffect(() => {
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
      
    })
    return (
        <div className="margenTop">
          <FadeIn>
          <h1 className="bienvenida">Hola, Bienvenido al CITRA</h1>
          <div className="subtitulo">Adminitracion de las estaciones agrometeorologicas</div>
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
            <CardAdmin title="DATOS"/>
            <Estaciones />
            <DataEstacion>
            <CountUp  start={0} end={nroDatos} duration={1} />
            </DataEstacion>
            <DataLabel> Almacenados</DataLabel>
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
        </div>
    )
}

export default DashAdmin
