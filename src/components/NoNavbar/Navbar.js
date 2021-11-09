import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import logo from './logo.png';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    return (
        <>

            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="80px" className={classes.image}/>
                    </Typography>
                    <div className={classes.grow} />
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default Navbar;
