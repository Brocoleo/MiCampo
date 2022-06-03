import React from 'react';
import { useNavigate  } from "react-router-dom";
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
    marginLeft: '19%',
    marginBottom: '3%',
    backgroundColor: '#0F044C',
 
    '&:hover': {
      backgroundColor: '#120b38',
      borderColor: '#120b38',
      boxShadow: 'none',
    }
  }));

  const useStyles = makeStyles((theme) => ({
    card: {
      width: '250px',
      borderRadius: 30,
      transition: "0.3s",

      border: '6px solid #E1E5EA',
      "&:hover": {
    
      }
    },
    actions: {
      alignItems: 'center',
      backgroundColor: '#E1E5EA',
    }, 
    tituloEstacion:{
      textTransform: 'uppercase',
    }
  }));




export default function CardEstaciones({ data, config }) {
  const navigate = useNavigate ();
  const styles= useStyles();
  const verSensores = () =>{
    Cookies.set("estacion", data );
    navigate('/admin/sensores')
  }


    return (
        <Grid  item xs={5}>
            <Card sx={{ maxWidth: 345,  borderRadius: 6 } } className={styles.card}>
     
                <CardContent>
                    <Typography variant="h5" component="div" className={styles.tituloEstacion}>
                        {data}
                    </Typography>
  
                </CardContent>
                <CardActions  className={styles.actions} disableSpacing={true}>
                <VerButton variant="outlined"  onClick={()=>verSensores()}>
                                Ver Sensores
                                </VerButton>
                </CardActions>
            </Card>
        </Grid>


    
  );
}