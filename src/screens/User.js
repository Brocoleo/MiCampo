import React from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import useStyles from './styles'
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import DashUser from './DashUser';
 import Info from './Info'
import Notifications from './Notifications';



const User = ({ toggle, isOpen}) => {
    const classes = useStyles();
   
    return (
      <Router>
         <Navbar  toggle={toggle}/>
        <div className={classes.root}>       
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Switch>
          <Route exact path="/"><DashUser  /></Route>
          <Route path="/informacion"><Info  /></Route>
          <Route path="/notificaciones"><Notifications  /></Route>
        </Switch>
        
      </div>
      </Router>
    )
}

export default User
