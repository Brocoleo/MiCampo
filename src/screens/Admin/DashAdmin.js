import React from 'react'
import FadeIn from 'react-fade-in';
import Grid from '@material-ui/core/Grid';
import  {CardUsers, CardEstaciones, DataUsers, DataEstacion,DataSensores,DataLabel, CardSensores} from '../styles'
import CardAdmin from '../../components/Admin/CardAdmin/CardAdmin';
import Users from '../../components/Animations/Users';
import Estaciones from '../../components/Animations/Estaciones';
import Sensores from '../../components/Animations/Sensores';

const DashAdmin = () => {
    return (
        <div >
          <FadeIn>
          <h1 className="bienvenida">Hola, Bienvenido al CITRA</h1>
          <div className="subtitulo">Adminitracion de las estaciones agrometeorologicas</div>
          </FadeIn>
        <Grid container spacing={6}> 
        <FadeIn>
        <Grid item xs>
          <CardUsers>
            <CardAdmin title="USUARIOS"/>
            <Users />
            <DataUsers>145</DataUsers>
            <DataLabel> Registrados</DataLabel>
          </CardUsers>  
        </Grid>
        </FadeIn>
        <FadeIn>
          <Grid item xs>
          <CardEstaciones>
            <CardAdmin title="ESTACIONES"/>
            <Estaciones />
            <DataEstacion>386</DataEstacion>
            <DataLabel> Desplegadas</DataLabel>
          </CardEstaciones>
          </Grid>
          </FadeIn>
          <FadeIn>
          <Grid item xs>
          <CardSensores>
            <CardAdmin title="SENSORES"/>
            <Sensores />
            <DataSensores>920</DataSensores>
            <DataLabel> Integrados</DataLabel>
          </CardSensores>
          </Grid>
          </FadeIn>

                
        </Grid>
        </div>
    )
}

export default DashAdmin
