import React from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import useStyles from '../styles'
import DashAdmin from './DashAdmin'
import PanelUsuarios from './PanelUsuarios'
import PanelEstaciones from './PanelEstaciones'
import Navbar from "../../components/Admin/Navbar/Navbar"
import Sidebar from "../../components/Admin/Sidebar/Sidebar";


const Admin = ({ toggle, isOpen}) => {
    const classes = useStyles();
    return (
        <Router>
            <Navbar toggle={toggle}/>
            <div className={classes.root}>       
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Switch>
            <Route exact path="/admin"><DashAdmin /></Route>
            <Route path="/usuarios"><h1><PanelUsuarios /></h1></Route>
            <Route path="/estaciones"><h1><PanelEstaciones /></h1></Route>
            <Route path="/sensores"><h1><PanelEstaciones /></h1></Route>
            <Route path="/configuracionadmin"><h1>Configuraciones</h1></Route>
            </Switch>
       
        
      </div>
        </Router>
    )
}

export default Admin
