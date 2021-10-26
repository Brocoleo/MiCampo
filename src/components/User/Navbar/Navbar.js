import React,{useState} from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import logo from './logo.png';
import FadeIn from 'react-fade-in';
import { NavIcon, Bars } from './NavbarElements';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notifications from '../../../screens/User/Notifications'
import useStyles from './styles';
import { alpha, styled } from '@mui/material/styles';

const Navbar = ({ toggle }) => {
    const sx={ width: 250 }
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        };
    
    const handleClose = () => {
        setAnchorEl(null);
        };

        const ArrowStyle = styled('span')(({ theme }) => ({
            [theme.breakpoints.up('sm')]: {
              top: -7,
              zIndex: 1,
              width: 12,
              right: 20,
              height: 12,
              content: "''",
              position: 'absolute',
              borderRadius: '0 0 4px 0',
              transform: 'rotate(-135deg)',
              background: theme.palette.background.paper,
              borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
              borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
            }
        }));

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>

            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="citra" height="80px" className={classes.image}/>
                    </Typography>
                    <div className={classes.grow} />
                   <NavIcon onClick={toggle}>
                  <Bars />
                </NavIcon>
                <FadeIn  className={classes.notificacion}>
              
                    <Badge badgeContent={5} color="warning" >
                              
                            <NotificationsIcon  onClick={handleClick}/> 
                            <Popover 
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                PaperProps={{
                                sx: {
                                mt: 1.5,
                                ml: 1.7,
                                overflow: 'inherit',
                                boxShadow: (theme) => theme.grey,
                                border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
                                width: 200,
                                ...sx
                                }
                            }}
                            >
                            <ArrowStyle className="arrow" />
                            <Notifications/>
                            </Popover>
                       
                    </Badge>
                </FadeIn>
                </Toolbar>
            </AppBar> 
        </>
    )
}

export default Navbar;
