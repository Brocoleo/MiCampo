import React from 'react';
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Cookies from "js-cookie";
import {makeStyles} from '@material-ui/core/styles';



const VerButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    borderRadius: '10px',
    marginLeft: '30%',
    marginBottom: '3%',
    backgroundColor: '#0F044C',
    boxShadow: '0 3px 3px 0 #134E5E',
    '&:hover': {
      backgroundColor: '#120b38',
      borderColor: '#120b38',
      boxShadow: 'none',
    }
  }));

  const useStyles = makeStyles((theme) => ({
    card: {
      margin: "auto",
      borderRadius: 30,
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      border: '6px solid #E1E5EA',
      "&:hover": {
        boxShadow: "0 16px 60px -12.125px rgba(0,0,0,0.3)"
      }
    },
    actions: {
      backgroundColor: '#E1E5EA',
    }, 
    tituloEstacion:{
      textTransform: 'uppercase',
      fontFamily: 'Nunito'
    }
  }));




export default function CardEstaciones({ data, config, estacionUrl, estacion}) {
  const history = useHistory();
  const styles= useStyles();
  const verSensores = () =>{
    Cookies.set("estacion", data.id );
    history.push({ pathname: '/sensores'   })
  }

 /*  const seleccionarEstacion=(number, row)=>{
        setSector(row);
        axios.get(estacionUrl+`/`+ number, config).then((response) => {
          var count = Object.keys(response.data).length;
          if(count===0){
            setEstacion([{
              nombreComponente: '',
              tipoCultivo: 'Sin Sensores '
            }
    
            ]);
          }else{
            setEstacion(response.data);
          }
          return <h3>{estacion}</h3>
       });
      } */


    return (

        <Grid  item xs={3}>
            <Card sx={{ maxWidth: 345,  borderRadius: 6 } } className={styles.card}>
                <CardContent>
                    <Typography variant="h5" component="div" className={styles.tituloEstacion}>
                        {data.nombreSector}
                    </Typography>
  
                </CardContent>
                <CardActions  className={styles.actions} disableSpacing={true}>
                <VerButton variant="outlined"  onClick={()=>verSensores()}>
                                Ver Estacion
                                </VerButton>
                </CardActions>
            </Card>
        </Grid>


    
  );
}