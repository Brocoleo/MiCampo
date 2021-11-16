import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import Grid from '@mui/material/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete, Flag} from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const baseUrl='https://sensoresapi.herokuapp.com/api/v1/sector'
const estacionUrl='https://sensoresapi.herokuapp.com/api/v1/component'

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      borderRadius: '25px',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #134E5E',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    btnDelete:{
        cursor: 'pointer',
        padding: '2%',
        width: '18%',
        color: '#E02401',
        borderRadius: '30px',
        backgroundColor: '#EDEDED ',
        '&:hover': {
          backgroundColor: '#9c9a9a',
        }
        
      }, 
      btnEditar:{
        cursor: 'pointer',
        width: '18%',
        padding: '2%',
        color: '#F78812',
        borderRadius: '30px',
        backgroundColor: '#EDEDED',
        '&:hover': {
          backgroundColor: '#9c9a9a',
        }
      },  
      btnEditarSensor:{
        cursor: 'pointer',
        width: '90px',
        marginTop: '10%',
        padding: '2%',
        color: '#F78812',
        borderRadius: '30px',
        backgroundColor: '#EDEDED',
        '&:hover': {
          backgroundColor: '#9c9a9a',
        }
      },
    inputMaterial:{
      width: '100%',
      fontSize: '1rem',
      marginTop: '20px'
    },
    tituloEditar:{
        width: '48%',
        color: '#134E5E',
        borderRadius: '30px',
        backgroundColor: '#D3E0EA',
        paddingLeft: '30px',
        paddingTop: '10px',
        paddingBottom: '10px'
      }
      ,
    tituloInsertar:{
        width: '55%',
        color: '#134E5E',
        borderRadius: '30px',
        backgroundColor: '#D3E0EA',
        paddingLeft: '30px',
        paddingTop: '10px',
        paddingBottom: '10px'
      },
      tituloEstacion:{
        textTransform: 'uppercase',
        width: '75%',
        color: '#134E5E',
        borderRadius: '30px',
        backgroundColor: '#D3E0EA',
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
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: '18px',
      backgroundColor: '#134E5E',
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
  const VerButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    borderRadius: '10px',
    backgroundColor: '#134E5E',
    boxShadow: '0 3px 3px 0 #134E5E',
    '&:hover': {
      backgroundColor: '#062f3b',
      borderColor: '#062f3b',
      boxShadow: 'none',
    }
  }));

  const ButtoInsertar = styled(Button)({
    marginLeft: '57%',
    textTransform: 'none',
    fontSize: '1.2rem',
    padding: '6px 15px',
    fontWeight: '300',
    textShadow: '1px 1px #000',
    boxShadow: '0 6px 9px 0 #134E5E',
    color: '#fff',
    backgroundColor: '#134E5E',
    borderColor: '#134E5E',
    '&:hover': {
      backgroundColor: '#062f3b',
      borderColor: '#062f3b',
      boxShadow: 'none',
    }
  });
  
  function PanelEstaciones({config}) {
    const styles= useStyles();
    const [sectores, setSectores] = useState();
    const [estacion, setEstacion]=useState();
    const [sensor, setSensor]=useState();
    const [sensorActual, setSensorActual]=useState();
    const [cultivo, setCultivo]=useState();
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEditarSensor, setModalEditarSensor]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [modalEstacion, setModalEstacion]=useState(false);
    const [sector, setSector]=useState({
      id: '',
      nombreSector: ''
    })
    const [componente, setComponente]=useState({
      email: '',
      sector: '',
      tipoCultivo: '',
      nombreComponente: ''
    })

    useEffect(() => {
      //Obtener Sectores
      axios.get(baseUrl,config).then((response) => {
      setSectores(response.data);
      });

      
    },)

    const handleChange=e=>{
      const {name, value}=e.target;
      setComponente(prevState=>({
        ...prevState,
        [name]: value
      }))
    }

  
    const peticionPost=async()=>{
      let post = {
        "email": componente.email,
        "sector": componente.sector,
        "tipoCultivo": componente.tipoCultivo ,
        "nombreComponente": componente.nombreComponente
      }

      console.log(post)
      console.log(baseUrl, post, config)
      await axios.post(baseUrl, post, config)
      .then(response=>{
        abrirCerrarModalInsertar()
      })
    }
  
    const peticionPut=async()=>{
      let edit = {
        "tipoCultivo": cultivo ,
        "nombreComponente": sensor
      }
      await axios.put(estacionUrl+`/sensor%20`+sensorActual, edit, config)
      .then(response=>{
        console.log(response.data)
      })
      abrirCerrarModalEditarSensor();
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

    const abrirCerrarModalEditarSensor=(sensor, cultivo)=>{
      setSensorActual(sensor)
      setSensor(sensor)
      setCultivo(cultivo)
      setModalEditarSensor(!modalEditarSensor);
    }

    const abrirCerrarModalEstacion=()=>{
      setModalEstacion(!modalEstacion);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
    const seleccionarsector=(number, row, caso)=>{
      setSector(row);
      axios.get(estacionUrl+`/`+ number, config).then((response) => {
        var count = Object.keys(response.data).length;
        if(count===0){
          setEstacion([{
            nombreComponente: '',
            tipoCultivo: 'Sin Sensores '
          }

          ]);
        }else{
          setEstacion(response.data);
        }
     });    
      setTimeout(() => {
        (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
    }, 1000);
      
    }

    const seleccionarEstacion=(number, row)=>{
      setSector(row);
      axios.get(estacionUrl+`/`+ number, config).then((response) => {
        var count = Object.keys(response.data).length;
        if(count===0){
          setEstacion([{
            nombreComponente: '',
            tipoCultivo: 'Sin Sensores '
          }

          ]);
        }else{
          setEstacion(response.data);
        }
     });
      setTimeout(() => {
      abrirCerrarModalEstacion()
    }, 1000); }
  
    const bodyEstacion=(
      <div className={styles.modal}>
        <FadeIn>
        <h2 className={styles.tituloEstacion}>{sector.nombreSector}</h2>
          <ul>
            {estacion && estacion.map((anObjectMapped, index) => {
              return (
              <h3 key={`${anObjectMapped.nombreComponente}_{anObjectMapped.tipoCultivo}`}>
                {anObjectMapped.nombreComponente} - {anObjectMapped.tipoCultivo}
                </h3>);    })}           
                </ul>
            <br /><br />
            <div align="right">
              <Button  className={styles.btnCancelar} onClick={()=>abrirCerrarModalEstacion()}>Cancelar</Button>
            </div>
        </FadeIn>
      </div>
    )

  
    const bodyInsertar=(

      <div className={styles.modal}>
        <FadeIn>
        <h2 className={styles.tituloInsertar}>Agregar Sector</h2>
        <TextField name="email" className={styles.inputMaterial} label="Correo Usuario" onChange={handleChange} variant="outlined"/> 
        <br />
        <TextField name="sector" className={styles.inputMaterial} label="Sector" onChange={handleChange} variant="outlined"/> 
        <br />
        <TextField name="tipoCultivo" className={styles.inputMaterial} label="Tipo Cultivo" onChange={handleChange} variant="outlined"/> 
        <br />
        <TextField name="nombreComponente" className={styles.inputMaterial} label="Nombre Sensor" onChange={handleChange} variant="outlined"/> 
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
        <h2 className={styles.tituloEstacion}>{sector.nombreSector}</h2>
          <ul>
            {estacion && estacion.map((anObjectMapped, index) => {
              return (
                <Grid container spacing={2}>
                <Grid item xs="auto">
                <h3 key={`${anObjectMapped.nombreComponente}_{anObjectMapped.tipoCultivo}`}>
                {anObjectMapped.nombreComponente} - {anObjectMapped.tipoCultivo}
                </h3>
                </Grid>
                <Grid className="editarLayout" item xs>
                <Edit className={styles.btnEditarSensor} onClick={()=>abrirCerrarModalEditarSensor(anObjectMapped.nombreComponente, anObjectMapped.tipoCultivo)}/>
                </Grid>
              </Grid>); })}    
          </ul>
            <br /><br />
            <div align="right">
              <Button  className={styles.btnCancelar} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </FadeIn>
      </div>
    )

    const bodyEditarSensor=(
      <div className={styles.modal}>
      <FadeIn>
        <h2 className={styles.tituloEditar}>Editar Sector</h2>
        <TextField name="email" className={styles.inputMaterial} label="Correo" onChange={event => setSensor(event.target.value)} value={sensor} variant="outlined"/>
        <br />
        <TextField name="nombreSector" className={styles.inputMaterial} label="Nombre Sector" onChange={event => setCultivo(event.target.value)} value={cultivo} variant="outlined"/>
        <br /><br />
        <div align="right">
          <Button className={styles.btnAgregar} onClick={()=>peticionPut()}>Editar</Button>
          <Button className={styles.btnCancelar} onClick={()=>abrirCerrarModalEditarSensor()}>Cancelar</Button>
        </div>
        </FadeIn>
      </div>
    )
    const bodyEliminar=(
      <div className={styles.modal}>
        <FadeIn>
        <p>Estás seguro que deseas eliminar a los sensores de <b>{sector && sector.nombreSector}</b> ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        </div>
        </FadeIn>
      </div>
    )
  
  
    return (
      <div >
        <FadeIn>
          <h1 className="bienvenida">Informacion de Estaciones</h1>
          <br />
          <ButtoInsertar ButtoInsertar onClick={()=>abrirCerrarModalInsertar()}>Nueva Estacion</ButtoInsertar>
          </FadeIn>

        <br />
    <FadeIn>
       <TableContainer style={{ width: 900,   borderRadius: '10px' }} component={Paper}>
         <Table>
         <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Estacion</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </StyledTableRow >
        </TableHead>
  
           <TableBody>
             {sectores && sectores.map(row=>(
               <StyledTableRow  key={row.id}>
                    <StyledTableCell align="center">
                    <VerButton variant="outlined" onClick={()=>seleccionarEstacion(row.id, row)} startIcon={<Flag />}>
                    {row.nombreSector}  
                      </VerButton>
                   </StyledTableCell>
                    <StyledTableCell align="center">
                    <Edit className={styles.btnEditar} onClick={()=>seleccionarsector(row.id, row, 'Editar')}/>
                    &nbsp;&nbsp;&nbsp;
                    <Delete  className={styles.btnDelete} onClick={()=>seleccionarsector(row.id, row, 'Eliminar')}/>
                   </StyledTableCell>
                   </StyledTableRow>
               
             ))}

           
           </TableBody>
         </Table>
       </TableContainer>

    </FadeIn>     
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
       open={modalEditarSensor}
       onClose={abrirCerrarModalEditarSensor}>
          {bodyEditarSensor}
       </Modal>
  
       <Modal
       open={modalEliminar}
       onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
       </Modal>

       <Modal
       open={modalEstacion}
       onClose={abrirCerrarModalEstacion}>
          {bodyEstacion}
       </Modal>

      </div>
    );
  }
  
  export default PanelEstaciones;