import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import Loading from '../../components/Loading'
import {makeStyles, ThemeProvider as MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Cookies from "js-cookie"; 
import { ThemeProvider } from 'styled-components';
import avatar from "../../assets/avatar.png" 
import ChatBot from 'react-simple-chatbot';
import Grid from '@mui/material/Grid';

const baseUrl='https://citra-sensores.herokuapp.com/api/component/paginacion'
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
    btnDelete:{
      cursor: 'pointer',
      padding: '10px',
      paddingLeft: '15px',
      paddingRight: '15px',
      width: '23px',
      color: '#E02401',
      borderRadius: '20px',
      backgroundColor: '#EDEDED ',
      '&:hover': {
        backgroundColor: '#BDBDBD',
        color: '#B31C00',
      },
      [theme.breakpoints.up('xl')]: {
        width: '28%',
      },
    }, 
    btnEditar:{
      cursor: 'pointer',
      width: '23px',
      padding: '10px',
      marginLeft: '34%',
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
      fontSize: '17px',
      backgroundColor: '#0F044C',
      padding: '15px',
      color: '#fff',
      textShadow: '1px 1px #000',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '17px',
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
    const [data, setData]=useState([]);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);

    const [sector, setSector]=useState({
      nombre_cultivo: '',
      nombre_sensor: '',
      valor_maximo: '',
      valor_minimo: '',
      nombre_nave: '',
      responsable: ''
    })
    const steps = [
      {
          id: '1',
          message:  `Estas en la vista de los sensores, aqui puedes ver la informacion general de los datos del CITRA. Puedes asignarle un sensor a un usuario para que pueda verlo desde su sesion de usuario`,
          end: true,
      },
     
    ];
    const [opened, setOponed] = useState(false);
    const toggleFloating = () => {
      setOponed(!opened);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ObtenerSectores = () => {
      axios.get(baseUrl,config).then((response) => {
        setSectores(response.data.componentes);
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
    const handleChange=e=>{
      const {name, value}=e.target;
      setSector(prevState=>({
        ...prevState,
        [name]: value
      }))
    }
  
 
  
  
  
    const peticionPut=async()=>{
      let edit = {
        "nombre_cultivo": sector.nombre_cultivo,
        "nombre_sensor": sector.nombre_sensor,
        "valor_maximo": sector.valor_maximo,
        "valor_minimo": sector.valor_minimo,
        "nombre_nave": sector.nombre_nave,
        "responsable": sector.responsable
      }
      await axios.patch(baseUrl+`/`+sector.nombre_sensor, edit, config)
      .then(response=>{
        var dataNueva=data;
        // eslint-disable-next-line
        dataNueva.map(data=>{
          if(data.nombre_sensor===sector.nombre_sensor){
            data.nombre_cultivo=sector.nombre_cultivo;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
    }
  
    const peticionDelete=async()=>{
      await axios.delete(baseUrl+sector.id)
      .then(response=>{
        setData(data.filter(consola=>consola.id!==sector.id));
        abrirCerrarModalEliminar();
      })
    }
  
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
    const seleccionarsector=(row, caso)=>{
      setSector(row);
      (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
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
          value={sector && sector.nombre_cultivo}
          onChange={handleChange}
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
         name="nombre_sensor"
          id="filled-select-currency-native"
          select
          label=" Sensor"
          value={sector && sector.nombre_sensor}
          onChange={handleChange}
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
        </Grid>
        <Grid container spacing={2}>
      
        <Grid item xs={6}>
        <TextField type="number" name="valor_maximo" className={styles.inputMaterial} label="Valor Maximo" onChange={handleChange} value={sector && sector.valor_maximo} variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
        <TextField type="number" name="valor_minimo" className={styles.inputMaterial} label="Valor Minimo" onChange={handleChange} value={sector && sector.valor_minimo} variant="outlined"/>
        </Grid>
     
      </Grid>

        <TextField name="nombre_nave" className={styles.inputMaterial} label="Nave" onChange={handleChange} value={sector && sector.nombre_nave} variant="outlined"/>
        <br />
        <TextField
         fullWidth 
         name="responsable"
          id="filled-select-currency-native"
          select
          label="Usuario"
          value={sector && sector.responsable}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {correos.map((option) => (
            <option key={option.id} value={option.email}>
              {option.email}
            </option>
            
          ))}
        </TextField>
        <br />
    
        <div align="right">
          <Button className={styles.btnAgregar} onClick={()=>peticionPut()}>Editar</Button>
          <Button className={styles.btnCancelar} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
        </FadeIn>
      </div>
    )
  
    const bodyEliminar=(
      <div className={styles.modal}>
         <FadeIn>
        <p>Estás seguro que deseas eliminar a <b>{sector && sector.nombreSector}</b> ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
  
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
       <TableContainer style={{ width: 900 , borderRadius: '10px',}} component={Paper}>
         <Table>
         <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Cultivo</StyledTableCell>
            <StyledTableCell align="center">Sensor</StyledTableCell>
            <StyledTableCell align="center">Valor Maximo</StyledTableCell>
            <StyledTableCell align="center">Valor Minimo</StyledTableCell>
            <StyledTableCell align="center">Nave</StyledTableCell>
            <StyledTableCell align="center">Usuario</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
                       
          </StyledTableRow >
        </TableHead>
  
           <TableBody>
             {sectores && sectores.map(row=>(
               <StyledTableRow  key={row.nombre_cultivo}>
                    <StyledTableCell component="th" scope="row" align="center"> {row.nombre_cultivo}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.nombre_sensor}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.valor_maximo}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.valor_minimo}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.nombre_nave}  </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center"> {row.responsable}  </StyledTableCell>
                    <StyledTableCell align="center">
                    <Edit className={styles.btnEditar} onClick={()=>seleccionarsector(row, 'Editar')}/>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <Delete  className={styles.btnDelete} onClick={()=>seleccionarsector(row, 'Eliminar')}/>
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
  
       <Modal
       open={modalEliminar}
       onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
       </Modal>
      
      </> 
    );
  }
  
  export default PanelSectores;