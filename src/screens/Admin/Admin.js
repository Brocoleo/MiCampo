import React from 'react'
import { Outlet} from "react-router-dom";
import useStyles from '../styles'
//import Navbar from "../../components/Navbar/Navbar"
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Admin/Sidebar/Sidebar";


const Admin = ({ toggle, isOpen}) => {
    console.disableYellowBox = true;
    const classes = useStyles();
       //  <Navbar toggle={toggle} isOpen={isOpen}/>

    return (
        <>
            <Navbar toggle={toggle} isOpen={isOpen}/>
            <div className={classes.admin}>       
            <Sidebar isOpen={isOpen} toggle={toggle} /> 
            <Outlet/>
        
      </div>
        </>
    )
}

export default Admin
