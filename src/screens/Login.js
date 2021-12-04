import React, {useState} from 'react'
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
import Loading from '../components/Loading';
import Cookies from "js-cookie";
import useStyles from './styles'
const theme = createTheme();


const Login = () => {
  const [loading, setLoading] = useState(false);
  const baseUrl='https://sensores-api-citra.herokuapp.com/api/v1/auth/login'
  const classes = useStyles();
  const history = useHistory();



    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        let post = {
          "email": data.get('email'),
          "password": data.get('password'),
        }
        axios.post(baseUrl, post)
        .then(response=>{
          if(response.data.user.role === 'admin'){
            Cookies.set("access", response.data.token );
            history.push({ pathname: '/admin'   })}

          if(response.data.user.role === 'customer'){
            console.log(response.data)
            Cookies.set("access", response.data.token );
            history.push({ pathname: '/user'})
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
        textTransform: 'none',
        fontSize: 21,
        padding: '12px 12px',
        lineHeight: 1.5,
        backgroundColor: '#0F044C',
        borderColor: '#0F044C',
        boxShadow: '0 3px 6px 0 #134E5E',
        fontFamily: 'Oswald, sans-serif',
        '&:hover': {
          backgroundColor: '#190680',
        },
        '&:active': {
          backgroundColor: '#190680',
        },
        
      });
    return (
        <>
         { loading ? ( <div className="loading"><Loading /> </div>) : (<FadeIn>          
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            
            <Grid container spacing={0}>
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
              label="Contraseña "
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
    </FadeIn>) }

         </>
    )
}

export default Login
