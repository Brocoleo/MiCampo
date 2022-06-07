import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system'; 
import FadeIn from 'react-fade-in';
import {makeStyles, ThemeProvider as MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Loading from '../../components/Loading'
import Paper from '@mui/material/Paper';
import Cookies from "js-cookie";  
import SearchBar from "material-ui-search-bar";
import { ThemeProvider } from 'styled-components';
import TablePagination from "@material-ui/core/TablePagination";
import avatar from "../../assets/avatar.png" 
import ChatBot from 'react-simple-chatbot';


const baseUrl='https://citra-sensores.herokuapp.com/api/users'

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
      fontFamily: `'Titillium Web', sans-serif`,
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
      paddingLeft: '15px',
      paddingRight: '15px',
      marginLeft: '34%',
      color: '#F78812',
      borderRadius: '20px',
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
      fontFamily: `'Titillium Web', sans-serif`,
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
          padding: '0px ' ,
          
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
        fontSize: '16px',
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
    fontFamily: 'Titillium Web',
    headerBgColor: '#031648',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3E497A',
    botFontColor: '#fff',
    userBubbleColor: '#DEA057',
    userFontColor: '#fff',
  };

  const ButtonInsertar = styled(Button)({
    marginLeft: '40%',
    textTransform: 'none',
    fontSize: '1.2rem',
    padding: '6px 15px',
    border: '1px solid',
    fontWeight: '300',
    textShadow: '1px 1px #000',
    fontFamily: `'Titillium Web', sans-serif`,
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
    const [loading, setLoading] = useState(false);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [rol, setRol] = React.useState('USER_ROLE');
    const token = Cookies.get("access"); 
    const config = {headers: { Authorization: `Bearer ${token}` }}; 
    const [searched, setSearched] = useState("");
    const [didMount, setDidMount] = useState(false);
    const [rows, setRows] = useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
      obtenerUsuarios()
    },)

    const steps = [
      {
          id: '1',
          message:  `Estas en la vista de los Usuarios aqui puedes AÑADIR, EDITAR y ELIMINAR usuarios de la plataforma`,
          end: true,
      },
    
      
    ];

    const obtenerUsuarios = () => {
      if(!didMount){
        axios.get(baseUrl,config).then((response) => {
        setUsuarios(response.data);
        setRows(usuarios)
          if(usuarios){
            setLoading(true)
            setDidMount(true)
          }      
      });
      }
    }
  
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

    const [opened, setOponed] = useState(false);
    const toggleFloating = () => {
      setOponed(!opened);
    };
  
  
    const peticionPost=async()=>{
      let post = {
        "nombre": usuario.nombre,
        "email": usuario.email ,
        "password": usuario.password,
        "role": rol
      }
      await axios.post(baseUrl, post, config)
      .then(response=>{
        setRows(rows.concat(response.data))
        abrirCerrarModalInsertar()
      })
    }
  
    const peticionPut=async()=>{
      let edit = {
        "nombre": usuario.nombre ,
        "email": usuario.email ,
        "role": usuario.role
      }
      await axios.patch(baseUrl+`/`+usuario.id,edit,config)
      .then(response=>{

        obtenerUsuarios()
        var dataNueva=usuarios;
        // eslint-disable-next-line
        dataNueva.map(data=>{
          if(data.id===usuario.id){
            data.nombre=usuario.nombre;
            data.email=usuario.email;
            data.password=usuario.password;
            data.role=usuario.role;
          }
        })
        setRows(dataNueva);
        abrirCerrarModalEditar();
      })
    }

  
    const peticionDelete=async()=>{
      await axios.delete(baseUrl+`/`+usuario.id,config)
      .then(response=>{
        setRows(rows.filter(consola=>consola.id!==usuario.id));
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
      <MuiThemeProvider theme={THEME}>
      <div className={styles.modal}>
        <FadeIn>
        <h2 className={styles.tituloInsertar}>Agregar Usuario</h2>
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} variant="outlined"/>
        <br />
        <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} variant="outlined"/>
        <br />
        <TextField name="password" type="password" className={styles.inputMaterial} label="Contraseña" onChange={handleChange} variant="outlined"/>
        <br />
        <br />
        <TextField
         fullWidth 
         name="role"
          id="filled-select-currency-native"
          select
          label="Rol"
          value={rol}
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
      </MuiThemeProvider>
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
    const requestSearch = (searchedVal) => {
      const filteredRows = usuarios.filter((row) => {
        return row.nombre.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };
  
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };

    const columns = [
      { id: "nombre", label: "Nombre", minWidth: 170 },
      { id: "email", label: "Correo", minWidth: 100 },

    ];
  
    return (
      <>{ loading ? (       <div >
        <FadeIn >
          <h1 className="bienvenida">INFORMACION USUARIOS</h1>
          </FadeIn>
        <br />
    <FadeIn>
    <Container>
          <Row> 
          <Col> <SearchBar
          placeholder='Buscar'
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}/></Col>
          <Col><ButtonInsertar onClick={()=>abrirCerrarModalInsertar()}>Nuevo Usuario</ButtonInsertar></Col>
          </Row>
          </Container> 

          <MuiThemeProvider theme={THEME}>
          <TableContainer style={{ width: 800, borderRadius: '10px', marginTop: '20px',}} component={Paper}>
          <Table classes={{root: styles.customTable}}>
            <TableHead>
              <StyledTableRow>
                {columns.map(column => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center"></StyledTableCell>
                 <StyledTableCell align="center"></StyledTableCell> 
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <StyledTableRow  role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={value} align={column.align}>
                            {value}
                          </StyledTableCell>
                        );
                      })}
                      <StyledTableCell>
                      <Edit className={styles.btnEditar} onClick={()=>seleccionarUsuario(row, 'Editar')}/>
                     </StyledTableCell>
                     <StyledTableCell>
                     <Delete  className={styles.btnDelete} onClick={()=>seleccionarUsuario(row, 'Eliminar')}/>
                     </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
          labelRowsPerPage= 'Registros por pagina'
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableContainer>
        </MuiThemeProvider>
        
     
    </FadeIn>     
    <ThemeProvider theme={theme}>
    <ChatBot 
    headerTitle="Asistente Virtual 👋"
    botAvatar = {avatar}
    style= {{height: '80vh', width: '350px'}}
    steps={steps}
    floating={true}
    opened={opened}
    toggleFloating={toggleFloating}
    bubbleStyle= {{maxWidth: "65%"}}
    />
     </ThemeProvider>
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