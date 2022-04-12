import * as React from 'react';
import Alert from '@mui/material/Alert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';



const Notifications = ({tipo, temperatura, humedad}) => {
  const TipoCultivo = (tipo) => {
    switch(tipo) {
      case 'Tomate':
        return <div>  {temperatura > 25 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Temperatura Alta</Alert>  }
        
        {temperatura < 18 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Temperatura Baja</Alert> }
        
        {temperatura >= 18 && temperatura <= 25 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Temperatura Normal</Alert>  }
    
        {humedad > 80 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Humedad Alta</Alert>  }
        
        {humedad < 70 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Humedad Baja</Alert> }
        
        {humedad >= 70 && temperatura <= 80 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Humedad Normal</Alert>  }</div>;

      case 'Berenjena':
        return <div>{temperatura > 23 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Temperatura Alta</Alert>  }
        
        {temperatura < 30 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Temperatura Baja</Alert> }
        
        {temperatura >= 23 && temperatura <= 30 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Temperatura Normal</Alert>  }
    
        {humedad > 65 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Humedad Alta</Alert>  }
        
        {humedad < 50 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Humedad Baja</Alert> }
        
        {humedad >= 50 && temperatura <= 65 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Humedad Normal</Alert>  }</div>;

      case 'Lechuga':
        return <div>{temperatura > 16 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Temperatura Alta</Alert>  }
        
        {temperatura < 26 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Temperatura Baja</Alert> }
        
        {temperatura >= 16 && temperatura <= 26 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Temperatura Normal</Alert>  }
    
        {humedad > 70 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Humedad Alta</Alert>  }
        
        {humedad < 50 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Humedad Baja</Alert> }
        
        {humedad >= 50 && temperatura <= 70 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Humedad Normal</Alert>  }</div>;

      case 'Pepino':
        return <div>{temperatura > 30 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Temperatura Alta</Alert>  }
        
        {temperatura < 20 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Temperatura Baja</Alert> }
        
        {temperatura >= 20 && temperatura <= 30 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Temperatura Normal</Alert>  }
    
        {humedad > 90 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Humedad Alta</Alert>  }
        
        {humedad < 60 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Humedad Baja</Alert> }
        
        {humedad >= 60 && temperatura <= 90 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Humedad Normal</Alert>  }</div>;

      case 'Repollo':
        return <div>{temperatura > 16 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Temperatura Alta</Alert>  }
        
        {temperatura < 21 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Temperatura Baja</Alert> }
        
        {temperatura >= 16 && temperatura <= 21 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Temperatura Normal</Alert>  }
    
        {humedad > 90 &&
          <Alert icon={<ArrowUpwardIcon fontSize="inherit" />} severity="error">Humedad Alta</Alert>  }
        
        {humedad < 80 &&
          <Alert icon={<ArrowDownwardIcon fontSize="inherit" />} severity="info">Humedad Baja</Alert> }
        
        {humedad >= 80 && temperatura <= 90 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Humedad Normal</Alert>  }</div>;


      default:
        return 'foo';
    }
  }


  return (
    <div>
    {TipoCultivo(tipo)}
    </div>
  );
}

export default Notifications;