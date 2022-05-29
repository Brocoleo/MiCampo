import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { InfoContainer} from '../styles'
import FadeIn from 'react-fade-in';
import Cookies from "js-cookie";  
import Loading from '../../components/Loading'
const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  tituloInfo:{
    fontVariantCaps: 'small-caps',
    width: '90%',
    color: '#0F044C',
    borderRadius: '10px',
    backgroundColor: '#C8C6C6',
    paddingLeft: '10px',
    paddingTop: '10px',
    paddingBottom: '10px'
  }

}));
const infoUrl='http://localhost:3000/api/auth/profile'

export default function Info() {
  const token = Cookies.get("access"); 
  const config = {headers: { Authorization: `Bearer ${token}` }};
  const [usuario, setUsuario]=useState({
    id: '',
    nombre: '',
    email: '',
    img: '',
    role: '',
    google: '',
    recoveryToken: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setUsuario(prevState=>({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    axios.get(infoUrl,config).then((response) => {
      setUsuario(response.data);
       
  });
  })
  const BootstrapButton = styled(Button)({
    textTransform: 'none',
    fontSize: '1.2rem',
    padding: '12px 5px',
    borderRadius: '15px',
    border: '1px solid',
    fontWeight: '300',
    textShadow: '1px 1px #000',
    boxShadow: '0 6px 9px 0 #134E5E',
    color: '#fff',
    backgroundColor: '#0F044C',
    borderColor: '#0F044C',
    '&:hover': {
      textShadow: '1px 1px #000',
      boxShadow: '0 6px 9px 0 #134E5E',
      color: '#fff',
      backgroundColor: '#0F044C',
      borderColor: '#0F044C',
    }
  });

 
  const styles= useStyles();
  return (
    <div className="margenDatos" >
    <FadeIn>
    <InfoContainer>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        
          { usuario ? (
            <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <h2 className={styles.tituloInfo}>
             Mis Datos
          </h2><Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="success"
                fullWidth
                onChange={handleChange} value={usuario && usuario.nombre}
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               color="success"
                fullWidth
                name="email"
                label="Email" onChange={handleChange} value={usuario && usuario.email}
                id="email"
              />
            </Grid>
           
          </Grid>
          <BootstrapButton
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Guardar
          </BootstrapButton>
          
        </Box></Box>):( <div className="loading"><Loading /> </div>)}
          
        
       
      </Container>
    </ThemeProvider>
    </InfoContainer >
    </FadeIn>
    </div>
  );
}