import React from 'react'
import FadeIn from 'react-fade-in';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';
import  {CardUsers, CardEstaciones, DataUsers, DataEstacion,DataSensores,DataLabel, CardSensores} from '../styles'
import CardAdmin from '../../components/Admin/CardAdmin/CardAdmin';
import Users from '../../components/Animations/Users';
import Estaciones from '../../components/Animations/Estaciones';
import Sensores from '../../components/Animations/Sensores';

const DashAdmin = ({usuarios, sectores}) => {
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
            <DataUsers>
            <CountUp  start={0} end={usuarios} duration={1} />
            </DataUsers>
            <DataLabel> Registrados</DataLabel>
          </CardUsers>  
        </Grid>
        </FadeIn>
        <FadeIn>
          <Grid item xs>
          <CardEstaciones>
            <CardAdmin title="SECTORES"/>
            <Estaciones />
            <DataEstacion>
            <CountUp  start={0} end={sectores} duration={1} />
            </DataEstacion>
            <DataLabel> Ingresados</DataLabel>
          </CardEstaciones>
          </Grid>
          </FadeIn>
          <FadeIn>
          <Grid item xs>
          <CardSensores>
            <CardAdmin title="ESTACIONES"/>
            <Sensores />
            <DataSensores>
            <CountUp  start={0} end={30} duration={1} />
            </DataSensores>
            <DataLabel> Desplegadas</DataLabel>
          </CardSensores>
          </Grid>
          </FadeIn>

                
        </Grid>
        </div>
    )
}

export default DashAdmin
