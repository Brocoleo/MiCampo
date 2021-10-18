import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import logo from './logo.png';
import FadeIn from 'react-fade-in';
import { NavIcon, Bars } from './NavbarElements';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
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
                  <Bars />
                </NavIcon>
                <FadeIn  className={classes.notificacion}>
                    <Badge badgeContent={5} color="warning" >
                        <Link to='/notificaciones'>                        
                            <NotificationsIcon color="action" /> 
                        </Link>
                    </Badge>
                </FadeIn>
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default Navbar;
