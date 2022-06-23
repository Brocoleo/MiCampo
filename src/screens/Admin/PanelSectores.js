import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import Loading from '../../components/Loading'
import {makeStyles, ThemeProvider as MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit} from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Cookies from "js-cookie"; 
import { ThemeProvider } from 'styled-components';
import avatar from "../../assets/avatar.png" 
import ChatBot from 'react-simple-chatbot';
import Grid from '@mui/material/Grid';

const baseUrl='https://citra-sensores.herokuapp.com/api/component/paginacion'
const editUrl='https://citra-sensores.herokuapp.com/api/component/'
const usersUrl='https://citra-sensores.herokuapp.com/api/users'

const opcionesCultivo = [
  {
    value: 'Lechuga',
    label: 'Lechuga',
  },
  {
    value: 'Pepino',
    label: 'Pepino',
  },
  {
    value: 'Berenjena',
    label: 'Berenjena',
  },
  {
    value: 'Tomate',
    label: 'Tomate',
  },
  {
    value: 'Repollo',
    label: 'Repollo',
  }
];

const THEME = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        paddingTop: 10,
        paddingBottom: 10,
        "&:last-child": {
          paddingRight: 5
        }
      }
    }
  },
  typography: {
   "fontFamily": `'Titillium Web', sans-serif`,
   "fontSize": 12,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
  
});

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      borderRadius: '25px',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #0F044C',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    
    btnEditar:{
      cursor: 'pointer',
      width: '23px',
      padding: '10px',
      color: '#F78812',
      borderRadius: '20px',
      paddingLeft: '15px',
      paddingRight: '15px',
      backgroundColor: '#EDEDED',
      '&:hover': {
        backgroundColor: '#BDBDBD',
         color: '#C56C0E',
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: '24%',
        width: '28%',
      },
      
    }, 
    inputMaterial:{
      width: '100%',
      fontSize: '1rem',
      marginTop: '20px'
    },
    tituloEditar:{
        width: '48%',
        color: '#fff',
        borderRadius: '30px',
        backgroundColor: '#0F044C',
        paddingLeft: '30px',
        paddingTop: '10px',
        paddingBottom: '10px'
      }
      ,
    tituloInsertar:{
        width: '55%',
        color: '#fff',
        borderRadius: '30px',
        backgroundColor: '#0F044C',
        paddingLeft: '30px',
        paddingTop: '10px',
        paddingBottom: '10px'
      },
      btnAgregar:{
        cursor: 'pointer',
        color: '#fff',
        background : '#289672',
        marginRight:'10px',
        boxShadow: '0 3px 6px 0 #134E5E',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#1E6F5C',
            borderColor: '#1E6F5C',
            boxShadow: '0 3px 6px 0 #134E5E',
          },
      },
      btnCancelar:{
        cursor: 'pointer',
        color: '#fff',
        background  : '#E02401',
        boxShadow: '0 3px 6px 0 #134E5E',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#51050F',
            borderColor: '#51050F',
            boxShadow: '0 3px 6px 0 #134E5E',
          },
      },
      tablas: {
        marginTop: '9%'       
   }
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: '14px',
      backgroundColor: '#0F044C',
      padding: '14px',
      color: '#fff',
      textShadow: '1px 1px #000',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '15px',
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#D3E0EA',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#031648',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3E497A',
    botFontColor: '#fff',
    userBubbleColor: '#DEA057',
    userFontColor: '#fff',
  };

  
  function PanelSectores() {
    const token = Cookies.get("access"); 
    const config = {headers: { Authorization: `Bearer ${token}` }}; 
    const styles= useStyles();
    const [sectores, setSectores] = useState();
    const [didMount, setDidMount] = useState(false);
    const [correos, setCorreos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData]=useState();
    const [modalEditar, setModalEditar]=useState(false);
    const [correo, setCorreo] = useState();
    const [opened, setOponed] = useState(false);
    const [nombreCultivo, setNombreCultivo] = useState();
    const [nombreSensor, setNombreSensor] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [minTemp, setMinTemp] = useState();
    const [maxHumedad, setMaxHumedad] = useState();
    const [minHumedad, setMinHumedad] = useState();

  
    const steps = [
      {
          id: '1',
          message:  `Estás en la vista de los Usuarios, aquí puedes AÑADIR, EDITAR y ELIMINAR usuarios de la plataforma.`,
          end: true,
      },
     
    ];
    
    const toggleFloating = () => {
      setOponed(!opened);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ObtenerSectores = () => {
      axios.get(baseUrl,config).then((response) => {
        setSectores(response.data.componentes);
        setData(sectores)
        if(sectores){
          setLoading(true)
        }});}

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ObtenerUsuarios = () => {
      axios.get(usersUrl,config).then((response) => {
        setCorreos(response.data);
        }); 
    }

    useEffect(() => {
      if(correos && sectores){
        setDidMount(true)
      }
      if(!didMount){
        ObtenerSectores()
        ObtenerUsuarios()
      }
      
      
    },[didMount, setDidMount, sectores, correos, ObtenerSectores, ObtenerUsuarios])


   
  
    const peticionPut=async()=>{
      const idUser = correos.filter(dato=>dato.email === `${correo}`)
      let edit = {
        "nombreCultivo": nombreCultivo,
        "nombreSensor": nombreSensor,
        "valorMaximoTemp": maxTemp,
        "valorMinimoTemp": minTemp,
        "valorMaximoHumedad": maxHumedad,
        "valorMinimoHumedad": minHumedad,
        "userId": idUser[0].id,
      }
      await axios.patch(editUrl+`/`+nombreSensor, edit, config)
      .then(response=>{
        var dataNueva=sectores;
        // eslint-disable-next-line
        dataNueva.map(data=>{
          if(data.nombre_sensor===nombreSensor){
            data.responsable = correo;
            data.nombre_cultivo=nombreCultivo;
            data.nombre_sensor=nombreSensor;
            data.valor_maximo_Humedad=maxHumedad;
            data.valor_maximo_Temp=maxTemp;
            data.valor_minimo_Humedad=minHumedad;
            data.valor_minimo_Temp=minTemp;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
    }
  
   
  
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
   
  
    const seleccionarsector=(row)=>{
      setNombreSensor(row.nombre_sensor)
      setNombreCultivo(row.nombre_cultivo)
      setMaxTemp(row.valor_maximo_Temp)
      setMinTemp(row.valor_minimo_Temp)
      setMaxHumedad(row.valor_maximo_Humedad)
      setMinHumedad(row.valor_minimo_Humedad)
      setCorreo(row.responsable)
        abrirCerrarModalEditar()
    }
  
   
    const bodyEditar=(
      <div className={styles.modal}>
      <FadeIn>
        <h2 className={styles.tituloEditar}>Editar Sensor</h2>
        <br />
        <Grid container spacing={2}>
        <Grid item xs={6}>
        <TextField
         fullWidth 
         label="Cultivo"
         name="nombre_cultivo"
          id="filled-select-currency-native"
          select
          value={nombreCultivo}
          onChange={event => setNombreCultivo(event.target.value)}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {opcionesCultivo.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
       
        </Grid>
        <Grid item xs={6}>
        <TextField
         fullWidth 
         name="responsable"
          id="filled-select-currency-native"
          select
          label="Usuario"
          value={correo}
          onChange={event => setCorreo(event.target.value)}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {correos.map((option) => (
            <option key={option.id} value={option.email}>
              {option.email}
            </option> ))}
        </TextField>
        
        </Grid>
        </Grid>

        <Grid container spacing={2}>
        <Grid item xs={6}>
        <TextField type="number" name="valor_maximo_Temp" className={styles.inputMaterial} label="Temp. Maximo" onChange={event => setMaxTemp(event.target.value)} value={maxTemp} variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
        <TextField type="number" name="valor_minimo_Temp" className={styles.inputMaterial} label="Temp. Minima" onChange={event => setMinTemp(event.target.value)} value={minTemp} variant="outlined"/>
        </Grid>
        </Grid>

        <Grid container spacing={2}>
        <Grid item xs={6}>
        <TextField type="number" name="valor_maximo_Humedad" className={styles.inputMaterial} label="Hum. Maximo" onChange={event => setMaxHumedad(event.target.value)} value={maxHumedad} variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
        <TextField type="number"  name="valor_minimo_Humedad" className={styles.inputMaterial} label="Hum. Minima" onChange={event => setMinHumedad(event.target.value)} value={minHumedad} variant="outlined"/>
        </Grid>
        </Grid>
        <TextField type="text" name="nombre>sensor" className={styles.inputMaterial} label="Sensor" onChange={event => setNombreSensor(event.target.value)} value={nombreSensor} variant="outlined"/>
        <br />

 
  
        <div align="right">
          <Button className={styles.btnAgregar} onClick={()=>peticionPut()}>Editar</Button>
          <Button className={styles.btnCancelar} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
        </FadeIn>
      </div>
    )
  
  
  
  
    return (
      <>{ loading && correos? ( 
      <div className={styles.tablas}>
        <FadeIn>
          <h1 className="bienvenida">INFORMACION SENSORES</h1>
         
          </FadeIn>

        <br />
    <FadeIn>
    <MuiThemeProvider theme={THEME}>
       <TableContainer style={{ width: 800 , borderRadius: '10px',}} component={Paper}>
         <Table>
         <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Cultivo</StyledTableCell>
            <StyledTableCell align="center">Sensor</StyledTableCell>
            <StyledTableCell align="center">Temperatura</StyledTableCell>
            <StyledTableCell align="center">Humedad</StyledTableCell>
            <StyledTableCell align="center">Usuario</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
                       
          </StyledTableRow >
        </TableHead>
  
           <TableBody>
             {data && data.map(row=>(
               <StyledTableRow  key={row.nombre_cultivo}>
                    <StyledTableCell component="th" scope="row" align="center"> {row.nombre_cultivo}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.nombre_sensor}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.valor_minimo_Temp} - {row.valor_maximo_Temp}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.valor_minimo_Humedad} - {row.valor_maximo_Humedad}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.responsable}  </StyledTableCell>
                    <StyledTableCell align="center">
                    <Edit className={styles.btnEditar} onClick={()=>seleccionarsector(row)}/>
                    </StyledTableCell>
               </StyledTableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
       </MuiThemeProvider>
    </FadeIn> 
    <ThemeProvider theme={theme}>
    <ChatBot 
    headerTitle="Asistente Virtual 👋"
    botAvatar = {avatar}
    steps={steps}
    floating={true}
    style= {{height: '80vh', width: '350px'}}
    opened={opened}
    toggleFloating={toggleFloating}
    bubbleStyle= {{maxWidth: "65%"}}
    />
     </ThemeProvider>
    </div>
    ):(<div className="loading"><Loading /> </div>)}   
     
  
       <Modal
       open={modalEditar}
       onClose={abrirCerrarModalEditar}>
          {bodyEditar}
       </Modal>
  
  
      
      </> 
    );
  }
  
  export default PanelSectores;