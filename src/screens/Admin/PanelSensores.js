import React, {useEffect, useState, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Cookies from "js-cookie";
import axios from 'axios';
import FadeIn from 'react-fade-in';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import Loading from '../../components/Loading'

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: '#fff',
  }, 
  tituloEstacion:{
    textTransform: 'uppercase',
    fontFamily: 'Nunito'
  },
  cultivo: {
    color: '#fff',
    borderRadius: '90px',
    backgroundColor: '#0F044C',
    textTransform: 'uppercase',
    fontFamily: 'Nunito'
  },
  sensor: {
    textTransform: 'uppercase',
    color: '#272727'
  },
  image: {
    width: 250,
    height: 180,
    overflow: "hidden",
    borderWidth: 3,
  }
}));


const PanelSensores = ({config}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const estacion = Cookies.get("estacion");
  const styles= useStyles();
  const estacionUrl='https://sensoresapi.herokuapp.com/api/v1/component'
  const [sensores, setSensores] =useState([]);
  const fetchMyAPI = useCallback(async () => {
    axios.get(estacionUrl+`/`+ estacion, config).then((response) => {
      var count = Object.keys(response.data).length;
      if(count===0){
        setSensores([{
          nombreComponente: '',
          tipoCultivo: 'Sin Sensores'
        }

        ]);
      }else{
        setSensores(response.data)
      }
   });
  }, [config, estacion])

  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])

  setTimeout(() => {
    setLoading(true)
  }, 1000);
  const VerGraficas = (sensor, tipo) =>{
    Cookies.set("sensor", sensor );
    // eslint-disable-next-line
    { tipo ==='Sin Sensores'? (console.log('sin sensores')) : ( history.push({ pathname: '/graficos'   }))} 
  }

  return (
  <>
  { loading ? (  <><FadeIn>
    <h1 className="bienvenidaSensores">Informacion Sensores</h1>
    </FadeIn>
    <br />
    <br />
      <Grid container spacing={1}>

            {sensores && sensores.map((anObjectMapped, index) => {
              return (
              <Grid  item xs>
                    <FadeIn>
              <Card sx={{ width: 250 ,  borderRadius: 6}} className={styles.card}>
                <CardActionArea onClick={()=>VerGraficas(anObjectMapped.nombreComponente, anObjectMapped.tipoCultivo)}>
                <img className={styles.image} src={require(`../../assets/${anObjectMapped.tipoCultivo}.jpg`).default} alt="" width="240" height="200"/>
                  <CardContent className={styles.info}>
                  <Typography gutterBottom variant="h6" className={styles.cultivo} component="div">
                  {anObjectMapped.tipoCultivo}
                  </Typography>
                  <Typography variant="body1" className={styles.sensor} color="#272727">
                  {anObjectMapped.nombreComponente} 
                  </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </FadeIn>
              </Grid>
              
            );    })}           

            <br /><br />
   
      </Grid> </>):(<div className="loading"><Loading /> </div>)}
      

    </>
  )
}

export default PanelSensores
