import React from 'react'
import Navbar from "../components/NoNavbar/Navbar";
import Water from "../components/Animations/Water";
import FadeIn from 'react-fade-in';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import  { InfoContainer, TituloInfo} from './styles'
const theme = createTheme();


const Login = ({  fetchWeather}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
          email: data.get('email'),
          password: data.get('password'),
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
        
        <Navbar />
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
          <Water />
          <TituloInfo>
            Inicia Sesión 
          </TituloInfo>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuerdame"
            />
            
             
            </Grid>
            <BootstrapButton
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {window.location.href="/"}}
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
