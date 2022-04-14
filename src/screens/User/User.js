import React from 'react'
import { Outlet} from "react-router-dom";
import useStyles from '../styles'
import Navbar from "../../components/User/Navbar/Navbar";
import Sidebar from "../../components/User/Sidebar/Sidebar";


const User = ({ toggle, isOpen}) => {
    const classes = useStyles();
   
    return (
      <>
        <Navbar  toggle={toggle}/>
        <div className={classes.admin}>       
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Outlet/>
         
      </div>

      </>
    )
}

export default User
