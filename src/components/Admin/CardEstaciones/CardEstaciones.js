import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const VerButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    borderRadius: '10px',
    backgroundColor: '#0F044C',
    boxShadow: '0 3px 3px 0 #134E5E',
    '&:hover': {
      backgroundColor: '#120b38',
      borderColor: '#120b38',
      boxShadow: 'none',
    }
  }));

 






export default function CardEstaciones({sector, seleccionarEstacion, id, data}) {

    seleccionarEstacion(id, data)

    const seleccionarEstacion=(number, row)=>{
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
          return estacion;
       });
      }

    const bodyEstacion=(
        <>
        <h2 >{sector.nombreSector}</h2>
          <ul>
            {estacion && estacion.map((anObjectMapped, index) => {
              return (
              <h3 key={`${anObjectMapped.nombreComponente}_{anObjectMapped.tipoCultivo}`}>
                {anObjectMapped.nombreComponente} - {anObjectMapped.tipoCultivo}
                </h3>);    })}           
                </ul>
            <br /><br />
            </>
    )
    return (

        <Grid  item xs={3}>
            <Card sx={{ minWidth: 385 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {sector}
                    </Typography>
                    <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                <VerButton variant="outlined" >
                                Ver Estacion
                                </VerButton>
                </CardActions>
            </Card>
        </Grid>


    
  );
}