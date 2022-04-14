import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Loading from '../../components/Loading'
import Paper from '@mui/material/Paper';
import Cookies from "js-cookie";  

const baseUrl='https://sensores-citra.herokuapp.com/api/users'

const currencies = [
  {
    value: 'USER_ROLE',
    label: 'Usuario',
  },
  {
    value: 'ADMIN_ROLE',
    label: 'Administrador',
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
      paddingLeft: '15px',
      paddingRight: '15px',
      width: '23px',
      color: '#E02401',
      borderRadius: '20px',
      backgroundColor: '#EDEDED ',
      '&:hover': {
        backgroundColor: '#0F044C',
      },
      [theme.breakpoints.up('xl')]: {
        width: '28%',
      },
    }, 
    btnEditar:{
      cursor: 'pointer',
      width: '23px',
      padding: '10px',
      paddingLeft: '15px',
      paddingRight: '15px',
      marginLeft: '34%',
      color: '#F78812',
      borderRadius: '20px',
      backgroundColor: '#EDEDED',
      '&:hover': {
        backgroundColor: '#0F044C',
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
      customTable: {
        "& .MuiTableCell-sizeSmall": {
          padding: '6px ' //
        }
      },
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
        marginTop: '9%',
        padding: '6px '

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

  const ButtonInsertar = styled(Button)({
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
  
  function PanelUsuarios() {
    const styles= useStyles();
    const [usuarios, setUsuarios] = useState();
    const [data, setData]=useState([]);
    const [loading, setLoading] = useState(false);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [rol, setRol] = React.useState('USER_ROLE');
    const token = Cookies.get("access"); 
    const config = {headers: { Authorization: `Bearer ${token}` }}; 

    useEffect(() => {
      axios.get(baseUrl,config).then((response) => {
      setUsuarios(response.data);
        if(usuarios){
          setLoading(true)
        }
         
    });
    })
  
    const [usuario, setUsuario]=useState({
      id: '',
      nombre: '',
      email: '',
      password :'',
      role: ''
    })
  
    const handleChange=e=>{
      setRol(e.target.value);
      const {name, value}=e.target;
      setUsuario(prevState=>({
        ...prevState,
        [name]: value
      }))
    }
  
  
    const peticionPost=async()=>{
      let post = {
        "nombre": usuario.nombre,
        "email": usuario.email ,
        "password": usuario.password,
        "role": usuario.role
      }
      await axios.post(baseUrl, post, config)
      .then(response=>{
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
    }
  
    const peticionPut=async()=>{
      let edit = {
        "nombre": usuario.nombre ,
        "email": usuario.email ,
        "role": usuario.role
      }
      console.log(baseUrl+`/`+usuario.id,edit,config)
      await axios.patch(baseUrl+`/`+usuario.id,edit,config)
      .then(response=>{
        var dataNueva=data;
        // eslint-disable-next-line
        dataNueva.map(data=>{
          if(data.id===usuario.id){
            data.nombre=usuario.nombre;
            data.email=usuario.email;
            data.password=usuario.password;
            data.role=usuario.role;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
    }

  
    const peticionDelete=async()=>{
      await axios.delete(baseUrl+`/`+usuario.id,config)
      .then(response=>{
        setData(data.filter(consola=>consola.id!==usuario.id));
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
  
    const seleccionarUsuario=(row, caso)=>{
      setUsuario(row); 
      (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
    }
  
  
    const bodyInsertar=(
      <div className={styles.modal}>
        <FadeIn>
        <h2 className={styles.tituloInsertar}>Agregar Usuario</h2>
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} variant="outlined"/>
        <br />
        <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} variant="outlined"/>
        <br />
        <TextField name="password" className={styles.inputMaterial} label="Contraseña" onChange={handleChange} variant="outlined"/>
        <br />
        <br />
        <TextField
         fullWidth 
         name="role"
          id="filled-select-currency-native"
          select
          label="Rol"
          value={rol}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

   
       
        <br />
        
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
        <h2 className={styles.tituloEditar}>Editar Usuario</h2>
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={usuario && usuario.nombre} variant="outlined"/>
        <br />
        <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} value={usuario && usuario.email} variant="outlined"/>

        <br />
        <TextField
         fullWidth 
         name="role"
          id="filled-select-currency-native"
          select
          label="Rol"
          value={usuario.role}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <br />
        <br /><br />
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
        <p>Estás seguro que deseas eliminar a <b>{usuario && usuario.email}</b> ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
  
        </div>
        </FadeIn>
      </div>
    )
  
  
    return (
      <>{ loading ? (       <div  className={styles.tablas}>
        <FadeIn >
          <h1 className="bienvenida">Informacion de Usuarios</h1>
          <ButtonInsertar onClick={()=>abrirCerrarModalInsertar()}>Nuevo Usuario</ButtonInsertar>
          </FadeIn>

        <br />
    <FadeIn>
       <TableContainer style={{ width: 800, borderRadius: '10px', }} component={Paper}>
         <Table classes={{root: styles.customTable}}>
         <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell> 
          </StyledTableRow >
        </TableHead>
  
           <TableBody>
             {usuarios && usuarios.map(row=>(
               <StyledTableRow  key={row.id}>
                   <StyledTableCell component="th" scope="row" align="center">{row.nombre}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">{row.email}</StyledTableCell>
                    <StyledTableCell>
                    <Edit className={styles.btnEditar} onClick={()=>seleccionarUsuario(row, 'Editar')}/>
                   </StyledTableCell>
                   <StyledTableCell>
                   <Delete  className={styles.btnDelete} onClick={()=>seleccionarUsuario(row, 'Eliminar')}/>
                   </StyledTableCell>
               </StyledTableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
    </FadeIn>     

      </div>):(<div className="loading"><Loading /> </div>)}
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
  
  export default PanelUsuarios;