import React from 'react'
import { Outlet} from "react-router-dom";
import useStyles from '../styles'

//import PanelEstaciones from './PanelEstaciones'
import Navbar from "../../components/Admin/Navbar/Navbar"
import Sidebar from "../../components/Admin/Sidebar/Sidebar";


const Admin = ({ toggle, isOpen}) => {
    const classes = useStyles();



    return (
        <>
            <Navbar toggle={toggle}/>
            <div className={classes.admin}>       
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Outlet/>
 

       
        
      </div>
        </>
    )
}

export default Admin
