import React from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import useStyles from '../styles'
import { useLocation } from "react-router-dom";
import Navbar from "../../components/User/Navbar/Navbar";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import DashUser from './DashUser';
 import Info from './Info'

const User = ({ toggle, isOpen}) => {
    const classes = useStyles();
    const location = useLocation();
    const correo =location.state.detail.email
   
    return (
      <Router>
         <Navbar  toggle={toggle}/>
        <div className={classes.root}>       
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Switch>
          <Route exact path="/user"><DashUser /></Route>
          <Route path="/informacion"><Info correo={correo}/></Route>
          <Route path="/configuraciones"><h1>Configuracion Usuario</h1></Route>
        </Switch>
         
      </div>
      </Router>
    )
}

export default User
