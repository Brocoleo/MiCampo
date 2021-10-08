import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import logo from './logo.png';
import { NavIcon, Bars } from './NavbarElements';
import useStyles from './styles';

const Navbar = ({ toggle }) => {
    const classes = useStyles();


    return (
        <>

            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="80px" className={classes.image}/>
                    </Typography>
                    <div className={classes.grow} />
                   <NavIcon onClick={toggle}>
                   <p   className={classes.menu}>MENU</p>
                  <Bars />
                </NavIcon>
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default Navbar;
