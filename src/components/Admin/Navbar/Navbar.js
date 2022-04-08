import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import logo from './logo.png';
import { NavIcon } from './NavbarElements';
import useStyles from './styles';
import Hamburger from 'hamburger-react'


const Navbar = ({ toggle, isOpen}) => {
    const classes = useStyles();


    return (
        <>

            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="citra" height="50px" className={classes.image}/>
                    </Typography>
                    <div className={classes.grow} />
                   <NavIcon onClick={toggle}>
                   <Hamburger toggled={isOpen}/>
                </NavIcon>
                
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default Navbar;
