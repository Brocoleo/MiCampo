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
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import {Edit, Delete} from '@material-ui/icons';

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

  const StyledHeader = styled(CardHeader) `
  padding: 5px !important;
  height: 0px !important;
  > div {
    display: inherit !important;
    padding-right: 5px !important;
  }
`;

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




export default function CardEstaciones({ data, config, estacionUrl, estacion , seleccionarsector}) {
  const navigate = useNavigate ();
  const styles= useStyles();
  const verSensores = () =>{
    Cookies.set("estacion", data.id );
    navigate('/admin/sensores')
  }


    return (

        <Grid  item xs={3}>
            <Card sx={{ maxWidth: 345,  borderRadius: 6 } } className={styles.card}>
            <StyledHeader 
              action={<>
                <IconButton aria-label="edit">
                  <Edit onClick={()=>seleccionarsector(data.id, data, 'Editar')}/>
                </IconButton>
                <IconButton aria-label="delete">
                  <Delete onClick={()=>seleccionarsector(data.id, data, 'Eliminar')} />
                </IconButton>
                </>
              }
            />
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