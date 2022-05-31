import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import Loading from '../../components/Loading'
import Grid from '@mui/material/Grid';
import {makeStyles} from '@material-ui/core/styles';
import CardEstaciones from '../../components/Admin/CardEstaciones/CardEstaciones';
import Cookies from "js-cookie";  


const baseUrl='https://citra-sensores.herokuapp.com/api/component/nave'
const estacionUrl='https://citra-sensores.herokuapp.com/api/component/sensores'

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
        marginTop: '60px'       
   }
  }));



  function PanelEstaciones() {
    const token = Cookies.get("access"); 
    const config = {headers: { Authorization: `Bearer ${token}` }}; 
    const styles= useStyles();
    const [sectores, setSectores] = useState();
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [estacion, setEstacion]=useState();
    // eslint-disable-next-line
    const [sector, setSector]=useState({
      nombreNave: ''
    })


    useEffect(() => {
      //Obtener Sectores
      axios.get(baseUrl,config).then((response) => {
      setSectores(response.data);
      });
 
      if(sectores){
        setLoading(true)
      } 
    },[setLoading, config, sectores])

  
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

      
    } 



  
    return (
      <>
       { loading ? (      <div className={styles.tablas}>
        <FadeIn>
          <h1 className="bienvenidaEstaciones">Elige la Nave</h1>
       

        <br />

       
            <Grid   container  spacing={12}>
            {  sectores && sectores.map((row, index)=>(
              <CardEstaciones data={row.nombreNave}  config={config} estacionUrl={estacionUrl} estacion={estacion} seleccionarsector={seleccionarsector} key={index}/>  )) }
            </Grid>
   

    </FadeIn>     
     


      </div>) : (<div className="loading"><Loading /> </div>) }
      </>

    );
  }
  
  export default PanelEstaciones;