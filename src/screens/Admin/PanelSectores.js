import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import Loading from '../../components/Loading'
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Cookies from "js-cookie"; 
import Grid from '@mui/material/Grid';

const baseUrl='http://localhost:3000/api/component/paginacion'
const usersUrl='http://localhost:3000/api/users'

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
      width: '23px',
      color: '#E02401',
      borderRadius: '20px',
      backgroundColor: '#EDEDED ',
      '&:hover': {
        backgroundColor: '#9c9a9a',
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
      backgroundColor: '#EDEDED',
      '&:hover': {
        backgroundColor: '#9c9a9a',
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
      fontSize: '18px',
      backgroundColor: '#0F044C',
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

  const ButtoInsertar = styled(Button)({
    marginLeft: '60%',
    textTransform: 'none',
    fontSize: '1.2rem',
    padding: '6px 15px',
    border: '1px solid',
    fontWeight: '300',
    textShadow: '1px 1px #000',
    boxShadow: '0 6px 9px 0 #134E5E',
    color: '#fff',
    backgroundColor: '#0F044C',
    borderColor: '#0F044C',
    '&:hover': {
      backgroundColor: '#120b38',
      borderColor: '#120b38',
      boxShadow: 'none',
    }
  });
  
  function PanelSectores() {
    const token = Cookies.get("access"); 
    const config = {headers: { Authorization: `Bearer ${token}` }}; 
    const styles= useStyles();
    const [sectores, setSectores] = useState();
    const [correos, setCorreos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
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
    useEffect(() => {
      //Obtener Sectores
      axios.get(baseUrl,config).then((response) => {
      setSectores(response.data.componentes);
      if(sectores){
        setLoading(true)
      }
      });    
      
      //Obtener Usuarios
      axios.get(usersUrl,config).then((response) => {
        setCorreos(response.data);
       
        }); 
    })
    const handleChange=e=>{
      const {name, value}=e.target;
      setSector(prevState=>({
        ...prevState,
        [name]: value
      }))
    }
  
 
  
    const peticionPost=async()=>{
      let post = {
        "nombre_cultivo": sector.nombre_cultivo,
        "nombre_sensor": sector.nombre_sensor,
        "valor_maximo": sector.valor_maximo,
        "valor_minimo": sector.valor_minimo,
        "nombre_nave": sector.nombre_nave,
        "responsable": sector.responsable
      }
      await axios.post(baseUrl, post, config)
      .then(response=>{
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
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
  
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
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
  
    const bodyInsertar=(
      <div className={styles.modal}>
        <FadeIn>
        <h2 className={styles.tituloInsertar}>Agregar Sensor</h2>
        <Grid container spacing={2}>
        <Grid item xs={6}>
        <TextField
         fullWidth 
         label="Cultivo"
         name="nombre_cultivo"
          id="filled-select-currency-native"
          select
          value={sector.nombre_cultivo}
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
          value={sector.nombre_sensor}
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
        <TextField type="number" name="valor_maximo" className={styles.inputMaterial} label="Valor Maximo" onChange={handleChange} variant="outlined"/> 
        </Grid>
        <Grid item xs={6}>
        <TextField type="number" name="valor_minimo" className={styles.inputMaterial} label="Valor Minimo" onChange={handleChange} variant="outlined"/> 
        </Grid>
        </Grid>
        <TextField name="nombre_nave" className={styles.inputMaterial} label="Nave" onChange={handleChange} variant="outlined"/> 
        <br />
        <TextField
         fullWidth 
         name="responsable"
          id="filled-select-currency-native"
          select
          label="Usuario"
          value={sector.responsable}
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
        <br /><br />
        <div align="right">
          <Button  className={styles.btnAgregar} onClick={()=>peticionPost()}>Guardar</Button>
          <Button  className={styles.btnCancelar} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
        </FadeIn>
      </div>
    )
  
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
          <h1 className="bienvenida">Informacion de los Sensores</h1>
          <ButtoInsertar  onClick={()=>abrirCerrarModalInsertar()}>Nuevo Sensor</ButtoInsertar>
          </FadeIn>

        <br />
    <FadeIn>
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
    </FadeIn> 
    </div>
    ):(<div className="loading"><Loading /> </div>)}   
       <Modal
       open={modalInsertar}
       onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
       </Modal>
  
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