import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import Loading from '../../components/Loading'
import Grid from '@mui/material/Grid';
import {makeStyles} from '@material-ui/core/styles';
import CardEstaciones from '../../components/Admin/CardEstaciones/CardEstaciones';
import { Modal, Button, TextField} from '@material-ui/core';
import {Edit} from '@material-ui/icons';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const baseUrl='https://sensores-api-citra.herokuapp.com/api/v1/sector'
const estacionUrl='https://sensores-api-citra.herokuapp.com/api/v1/component'

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
      padding: '1%',
      width: '13%',
      color: '#E02401',
      borderRadius: '30px',
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
      width: '13%',
      padding: '1%',
      marginLeft: '0%',
      color: '#F78812',
      borderRadius: '30px',
      backgroundColor: '#EDEDED',
      '&:hover': {
        backgroundColor: '#9c9a9a',
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: '4%',
        width: '28%',
      },
      
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
      tituloEstacion:{
        textTransform: 'uppercase',
        width: '75%',
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
        marginTop: '3%'       
   }
  }));



  const ButtoInsertar = styled(Button)({
    marginLeft: '40%',
    textTransform: 'none',
    fontSize: '1.2rem',
    padding: '-1px 15px',
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
  
  function PanelEstaciones({config}) {
    const styles= useStyles();
    const [sectores, setSectores] = useState();
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [estacion, setEstacion]=useState();
    const [sensor, setSensor]=useState();
    const [sensorActual, setSensorActual]=useState();
    const [cultivo, setCultivo]=useState();
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEditarSensor, setModalEditarSensor]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    // eslint-disable-next-line
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
      console.log(estacionUrl, post, config)
      await axios.post(estacionUrl, post, config)
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


    setTimeout(() => {
      setLoading(true)
    }, 1000);


  
    const bodyInsertar=(

      <div className={styles.modal}>
        <FadeIn>
        <h2 className={styles.tituloInsertar}>Agregar Estacion</h2>
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
        <h2 className={styles.tituloEditar}>Editar {sensor}</h2>
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
      <>
       { loading ? (      <div className={styles.tablas}>
        <FadeIn>
          <h1 className="bienvenidaEstaciones">Informacion de Estaciones</h1>
          <br />
          <ButtoInsertar  onClick={()=>abrirCerrarModalInsertar()}>Nueva Estacion</ButtoInsertar>

        <br />

        <Box sx={{ flexGrow: 1 }}>
            <Grid   container  spacing={1}>
            {  sectores && sectores.map(row=>(
              <CardEstaciones data={row}  config={config} estacionUrl={estacionUrl} estacion={estacion} seleccionarsector={seleccionarsector}/>  )) }
            </Grid>
        </Box>

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


      </div>) : (<div className="loading"><Loading /> </div>) }
      </>

    );
  }
  
  export default PanelEstaciones;