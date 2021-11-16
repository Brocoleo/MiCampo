import React, {useEffect, useState}from 'react'
import axios from "axios";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import useStyles from '../styles'
import DashAdmin from './DashAdmin'
import PanelUsuarios from './PanelUsuarios'
import PanelSectores from './PanelSectores'
//import PanelEstaciones from './PanelEstaciones'
import Navbar from "../../components/Admin/Navbar/Navbar"
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import PanelEstaciones from './PanelEstaciones';
import Cookies from "js-cookie";


const Admin = ({ toggle, isOpen}) => {
    const classes = useStyles();
    const token = Cookies.get("access");
    const config = {headers: { Authorization: `Bearer ${token}` }};
    const [nroUsuarios, setNroUsuarios] = useState();
    const [nroSectores, setNroSectores] = useState();


    useEffect(() => {
        //Obtener Usuarios
        axios.get(`https://sensoresapi.herokuapp.com/api/v1/users`,config).then((response) => {
        setNroUsuarios(Object.keys(response.data).length)
        });
        //Obtener Sectores
        axios.get(`https://sensoresapi.herokuapp.com/api/v1/sector`,config).then((response) => {
        setNroSectores(Object.keys(response.data).length)
        });       
      })
    return (
        <Router>
            <Navbar toggle={toggle}/>
            <div className={classes.admin}>       
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Switch>
            <Route exact path="/admin"><DashAdmin usuarios={nroUsuarios} sectores={nroSectores}/></Route>
            <Route path="/usuarios"><PanelUsuarios config={config}/></Route>
            <Route path="/sectores"><PanelSectores config={config}/></Route>
            {/*<Route path="/estaciones"><PanelEstaciones /></Route>*/}
            <Route path="/estaciones"><PanelEstaciones config={config}/></Route>
            <Route path="/configuracionadmin"><h1>Configuraciones</h1></Route>
            </Switch>
       
        
      </div>
        </Router>
    )
}

export default Admin
