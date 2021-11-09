import React from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import logo from '../assets/logo.png';
import FadeIn from 'react-fade-in';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { InfoContainer, TituloLogin} from './styles'
import useStyles from './styles'
const theme = createTheme();


const Login = () => {

  const baseUrl='https://sensoresapi.herokuapp.com/api/v1/auth/login'
  const classes = useStyles();
  const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        let post = {
          "email": data.get('email'),
          "password": data.get('password'),
        }
        axios.post(baseUrl, post)
        .then(response=>{
          if(response.data.user.role === 'admin'){
            history.push({
              pathname: '/admin',
              search: '',
              state: { detail: response.data.token }
            })
          }
          if(response.data.user.role === 'customer'){
            history.push({
              pathname: '/user',
              search: '',
              state: { detail: response.data.user }
            })
          }
          else{
            console.log('error')
          }


          
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
      
        });
      };




      const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 21,
        padding: '12px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#134E5E',
        borderColor: '#134E5E',
        fontFamily: 'Oswald, sans-serif',
        '&:hover': {
          backgroundColor: '#71B280',
          borderColor: '##71B280',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#71B280',
          borderColor: '#71B280',
        },
        
      });
    return (
        <>
        
    <FadeIn>                                                                                     
    <InfoContainer>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="citra" height="110px" className={classes.image}/>
          <TituloLogin>
            BIENVENIDO
          </TituloLogin>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            
            <Grid container spacing={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contrasena"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
             
            </Grid>
            <BootstrapButton
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </BootstrapButton>
            
          </Box>
          
        </Box>
      </Container>
    </ThemeProvider>
    </InfoContainer>
    </FadeIn>
         </>
    )
}

export default Login
