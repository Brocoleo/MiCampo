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
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import  { InfoContainer, TituloLogin} from './styles'
import Loading from '../components/Loading';
import validator from 'validator';
import Typography from '@mui/material/Typography';
import Cookies from "js-cookie";
import useStyles from './styles'
import Link from '@mui/material/Link';

const theme = createMuiTheme({
  typography: {
   "fontFamily": `'Titillium Web', sans-serif`,
   "fontSize": 12,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [mensajeCorreo, setMensajeCorreo] = useState("");
  const [mensajePass, setMensajePass] = useState("");
  const baseUrl='https://citra-sensores.herokuapp.com/api/auth/login'
  const profileURL='https://citra-sensores.herokuapp.com/api/auth/profile'
  const classes = useStyles();
  const navigate = useNavigate();

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
            "email": data.get('email'),
            "password": data.get('password'),
          }
          axios.post(baseUrl, post)
          .then(response=>{
            Cookies.set("access", response.data.token );
            const token = Cookies.get("access");
            const config = {headers: { Authorization: `Bearer ${token}` }}; 
            axios.get(profileURL, config, post)
            .then(response=>{
              Cookies.set("nombre", response.data.nombre );
              console.log(response)
              if(response.data.role === 'ADMIN_ROLE'){
                navigate( '/admin/dash')}
    
              if(response.data.role === 'USER_ROLE'){
                navigate('/user/dash')}   
            })
                 
          })
          .catch(function (error) {
            if (error.response.data) {
              setLoading(false)
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
        fontFamily: 'Titillium Web, sans-serif',
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
          <img src={logo} alt="citra" height="80px" className={classes.image}/>
          <TituloLogin>
            BIENVENIDO
          </TituloLogin>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            
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
              sx={{ mt: 2, mb: 1 }}
            >
              Ingresar
            </BootstrapButton>
            <Grid container sx={{ mt: 1, mb: 1 }}>
                <Grid item xs>
                 
                </Grid>
                <Grid item>
                  <Link href="register" variant="body2">
                    {"No tienes cuenta? Registrate aqui"}
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

export default Login
