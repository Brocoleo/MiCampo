import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FadeIn from 'react-fade-in';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const baseUrl='https://sensoresapi.herokuapp.com/api/v1/users'

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
        color: '#E02401',
      }, 
      btnEditar:{
        cursor: 'pointer',
        color: '#F78812',
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
    backgroundColor: '#134E5E',
    borderColor: '#134E5E',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#134E5E',
      borderColor: '#134E5E',
      boxShadow: '0 6px 9px 0 #fff',
    },
    '&:active': {
        color: '#fff',
        backgroundColor: '#134E5E',
        borderColor: '#134E5E',
        boxShadow: '0 6px 9px 0 #fff',
    }
  });
  
  function PanelUsuarios({config}) {
    const styles= useStyles();
    const [usuarios, setUsuarios] = useState();
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);

    useEffect(() => {
      axios.get(baseUrl,config).then((response) => {
      setUsuarios(response.data);
    });
    })
  
    const [usuario, setUsuario]=useState({
      id: '',
      email: '',
      password :'',
      role: ''
    })
  
    const handleChange=e=>{
      const {name, value}=e.target;
      setUsuario(prevState=>({
        ...prevState,
        [name]: value
      }))
    }
  
  
    const peticionPost=async()=>{
      let post = {
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
        "email": usuario.email ,
        "role": usuario.role
      }
      console.log(baseUrl+`/`+usuario.id,edit,config)
      await axios.put(baseUrl+`/`+usuario.id,edit,config)
      .then(response=>{
        var dataNueva=data;
        // eslint-disable-next-line
        dataNueva.map(data=>{
          if(data.id===usuario.id){
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
      await axios.delete(baseUrl+usuario.id,config)
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
        <h2 className={styles.tituloInsertar}>Agregar Usuario</h2>
        <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange}/>
        <br />
        <TextField name="password" className={styles.inputMaterial} label="Contraseña" onChange={handleChange}/>
        <br />
        <TextField name="role" className={styles.inputMaterial} label="Rol" onChange={handleChange}/>
        <br />
        
        <br /><br />
        <div align="right">
          <Button  className={styles.btnAgregar} onClick={()=>peticionPost()}>Guardar</Button>
          <Button  className={styles.btnCancelar} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    )
  
    const bodyEditar=(
      <div className={styles.modal}>
        <h2 className={styles.tituloEditar}>Editar Usuario</h2>
        <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} value={usuario && usuario.email}/>
        <br />
        <TextField name="rol" className={styles.inputMaterial} label="Rol" onChange={handleChange} value={usuario && usuario.role}/>
        <br />
        <br /><br />
        <div align="right">
          <Button className={styles.btnAgregar} onClick={()=>peticionPut()}>Editar</Button>
          <Button className={styles.btnCancelar} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
      </div>
    )
  
    const bodyEliminar=(
      <div className={styles.modal}>
        <p>Estás seguro que deseas eliminar a <b>{usuario && usuario.email}</b> ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
  
        </div>
  
      </div>
    )
  
  
    return (
      <div >
        <FadeIn>
          <h1 className="bienvenida">Informacion de Usuarios</h1>
          <br />
          <ButtonInsertar onClick={()=>abrirCerrarModalInsertar()}>Nuevo Usuario</ButtonInsertar>
          </FadeIn>

        <br />
    <FadeIn>
       <TableContainer style={{ width: 900 }} component={Paper}>
         <Table>
         <TableHead>
          <StyledTableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Rol</StyledTableCell>
            <StyledTableCell >Acciones</StyledTableCell>
          </StyledTableRow >
        </TableHead>
  
           <TableBody>
             {usuarios && usuarios.map(row=>(
               <StyledTableRow  key={row.id}>
                   <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{row.email}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{row.role}</StyledTableCell>
                    <StyledTableCell>
                    <Edit className={styles.btnEditar} onClick={()=>seleccionarUsuario(row, 'Editar')}/>
                    &nbsp;&nbsp;&nbsp;
                    <Delete  className={styles.btnDelete} onClick={()=>seleccionarUsuario(row, 'Eliminar')}/>
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
       open={modalEliminar}
       onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
       </Modal>
      </div>
    );
  }
  
  export default PanelUsuarios;