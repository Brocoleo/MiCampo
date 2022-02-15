import React, {useEffect, useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Cookies from "js-cookie";
import { Container, Row, Col } from 'react-grid-system';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
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

const token = Cookies.get("access"); 
const config = {headers: { Authorization: `Bearer ${token}` }}; 
const PanelSensores = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const estacion = Cookies.get("estacion");
  const styles= useStyles();
  const estacionUrl='https://sensores-api-citra.herokuapp.com/api/v1/component'
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
  }, [estacion])

  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])

  setTimeout(() => {
    setLoading(true)
  }, 1000);
  const VerGraficas = (sensor, tipo) =>{
    Cookies.set("sensor", sensor );
    // eslint-disable-next-line
    { tipo ==='Sin Sensores'? (console.log('sin sensores')) : ( navigate('/admin/graficos'))} 
  }

  return (
  <>
  { loading ? (  <><FadeIn>
    <h1 className="bienvenidaSensores">Informacion Sensores</h1>
    </FadeIn>
    <br />
    <br />
      <Container>
        <Row>
            {sensores && sensores.map((anObjectMapped, index) => {
              console.log(anObjectMapped)
              return (
              <Col key={index}>
                    <FadeIn>
              <Card sx={{ width: 250 ,  borderRadius: 6, margin: 1}} className={styles.card}>
                <CardActionArea onClick={()=>VerGraficas(anObjectMapped.nombreComponente, anObjectMapped.tipoCultivo)}>
                <img className={styles.image} src={require(`../../assets/${anObjectMapped.tipoCultivo}.jpg`)} alt="" width="240" height="200"/>
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
              </Col>
              
            );    })}           

            <br /><br />
            </Row>
      </Container> </>):(<div className="loading"><Loading /> </div>)}
      

    </>
  )
}

export default PanelSensores
