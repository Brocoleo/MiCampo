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
  const [nroUsuarios, setNroUsuarios] = useState();
  const [nroSectores, setNroSectores] = useState();
  const token = Cookies.get("access");
  const config = {headers: { Authorization: `Bearer ${token}` }};


  useEffect(() => {
      //Obtener Usuarios
      axios.get(`https://sensores-api-citra.herokuapp.com/api/v1/users`,config).then((response) => {
      setNroUsuarios(Object.keys(response.data).length)
      });
      //Obtener Sectores
      axios.get(`https://sensores-api-citra.herokuapp.com/api/v1/sector`,config).then((response) => {
      setNroSectores(Object.keys(response.data).length)
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
        <CardLink to="/usuarios">
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
          <CardLink to="/sectores">
          <CardEstaciones>
            <CardAdmin title="SECTORES"/>
            <Estaciones />
            <DataEstacion>
            <CountUp  start={0} end={nroSectores} duration={1} />
            </DataEstacion>
            <DataLabel> Ingresados</DataLabel>
          </CardEstaciones>
          </CardLink>   
          </Grid>
          </FadeIn>

          <FadeIn>
          <Grid item xs>
          <CardLink to="/estaciones">
          <CardSensores>
            <CardAdmin title="ESTACIONES"/>
            <Sensores />
            <DataSensores>
            <CountUp  start={0} end={30} duration={1} />
            </DataSensores>
            <DataLabel> Desplegadas</DataLabel>
          </CardSensores>
          </CardLink> 
          </Grid>
          </FadeIn>

                
        </Grid>
        </div>
    )
}

export default DashAdmin
