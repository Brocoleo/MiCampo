import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { InfoContainer, TituloInfo} from '../styles'
import FadeIn from 'react-fade-in';
const theme = createTheme();

export default function Info() {
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
    <div  >
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
          
          <TituloInfo>
            Datos Personales
          </TituloInfo>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="success"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  defaultValue="Alberto"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="success"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellidos"
                  defaultValue="Perez Rojas"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="success"
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  defaultValue="alberto@gmail.com"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 color="success"
                  required
                  fullWidth
                  name="password"
                  label="Contrasena"
                  type="password"
                  defaultValue="Perez Rojas"
                  id="password"
                  autoComplete="new-password"
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
            
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </InfoContainer >
    </FadeIn>
    </div>
  );
}