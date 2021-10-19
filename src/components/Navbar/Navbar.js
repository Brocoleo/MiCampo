import React,{useState} from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import logo from './logo.png';
import FadeIn from 'react-fade-in';
import { NavIcon, Bars } from './NavbarElements';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notifications from '../../screens/Notifications'
import useStyles from './styles';

const Navbar = ({ toggle }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        };
    
    const handleClose = () => {
        setAnchorEl(null);
        };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
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
                              
                            <NotificationsIcon color="action" onClick={handleClick}/> 
                            <Popover 
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}

                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            >
                            <Notifications />
                            </Popover>
                       
                    </Badge>
                </FadeIn>
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default Navbar;
