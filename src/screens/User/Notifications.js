import * as React from 'react';
import Alert from '@mui/material/Alert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';

const Notifications = ({temperatura, humedad, humedadRelativa }) => {
  return (
    <div>

    {temperatura > 19 &&
      <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Temperatura Alta</Alert>  }
    
    {temperatura < 12 &&
      <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Temperatura Baja</Alert> }
    
    {temperatura >= 12 && temperatura <= 19 && 
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Temperatura Normal</Alert>  }



    {humedad > 80 &&
      <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Humedad Alta</Alert>  }
    
    {humedad < 20 &&
      <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Humedad Baja</Alert> }
    
    {humedad >= 20 && temperatura <= 80 && 
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Humedad Normal</Alert>  }




    </div>
  );
}

export default Notifications;