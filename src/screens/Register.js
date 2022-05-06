import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import FadeIn from 'react-fade-in';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { InfoContainer, TituloRegister} from './styles'
import Loading from '../components/Loading';
import validator from 'validator';
import Typography from '@mui/material/Typography';
import Cookies from "js-cookie";
import useStyles from './styles'
import Link from '@mui/material/Link';
const theme = createTheme();


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [mensajeCorreo, setMensajeCorreo] = useState("");
  const [mensajePass, setMensajePass] = useState("");
  const loginUrl='http://localhost:3000/api/auth/login'
  const baseUrl='http://localhost:3000/api/users/'
  const profileURL='http://localhost:3000/api/auth/profile'
  const navigate = useNavigate();
  const classes = useStyles();

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mi-campo.vercel.app/">
          Mi Campo
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  const handleChange = (event) => {
    setText({
      ...text,
      [event.target.name]: event.target.value,
    });
}
    const handleSubmit = (event) => {
        event.preventDefault();
        if(text){
          if(error === true  || text.email === ""){
            setError(true)
          }
          else{
          setLoading(true)
          const data = new FormData(event.currentTarget);
          // eslint-disable-next-line no-console
          let post = {
            "nombre": data.get('nombre'),
            "email": data.get('email'),
            "password": data.get('password'),
          }
          console.log(baseUrl, post)
          axios.post(baseUrl, post)
          .then(response=>{  

            let post = {
              "email": data.get('email'),
              "password": data.get('password'),
            }        
            axios.post(loginUrl, post)
            .then(response=>{
              if (response){
                navigate( '/')
              }   
            })
           
            
           
          })
          .catch(function (error) {
            if (error.response.data) {
              setLoading(false)
              console.log(error);
              setError(true)
              setErrorPass(true)
              setMensajePass('Credenciales no validas')
            }
          });
          }
        } 
      };


      useEffect(() => {
        if (text.email) {
         if(validator.isEmail(text.email) === false && text.email !=="" ){
           setError(true)
           setMensajeCorreo("Formato del correo no valido")
         }else{
           setError(false)
           setMensajeCorreo('')
         }
      }
      if (text.password) {
      if( text.password.length < 8 ){
        setErrorPass(true)
        setMensajePass("Contrasena demasiado corta")
      }else{
        setErrorPass(false)
        setMensajePass('')
      }
    }
      }, [text])



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
          <TituloRegister>
            REGRISTRATE
          </TituloRegister>
          <p>Rellena con tus datos para registrarte</p>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
            
            <Grid container spacing={0}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              error={error}
              helperText={mensajeCorreo}
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
              onChange={handleChange}
              error={errorPass}
              helperText={mensajePass}
            />
            </Grid>
            
            <BootstrapButton
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Guardar
            </BootstrapButton>
            <Grid container sx={{ mt: 2, mb: 2 }}>
                <Grid item xs>
                
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Ya estas registrado ? pincha aqui"}
                  </Link>
                </Grid>
              </Grid>
             <Copyright sx={{  mt: 1, mb: 1 }} />
          </Box>
          
        </Box>
      </Container>
    </ThemeProvider>
    </InfoContainer>
    </FadeIn>) }

         </>
    )
}

export default Register
