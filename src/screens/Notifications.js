import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function AlignItemsList() {
  return (
    <List sx={{ width: '100%', maxWidth: 550, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/icons/termometro.svg" />
        </ListItemAvatar>
        <ListItemText primary="La temperatura de la estacion Nº1 esta ALTA " secondary="Diciembre 9, 2021" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="icons/wind.svg" />
        </ListItemAvatar>
        <ListItemText primary="El viento esta por sobre los 2500mph" secondary="Septiembre 24, 2021" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/icons/humidity.svg" />
        </ListItemAvatar>
        <ListItemText primary="La humedad de la estacion Nº2 esta BAJA" secondary="Abril 17, 2021" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/icons/termometro.svg" />
        </ListItemAvatar>
        <ListItemText primary="La temperatura de la estacion Nº1 esta BAJA " secondary="Marzo 28, 2021" />
      </ListItem>

      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/icons/humidity.svg" />
        </ListItemAvatar>
        <ListItemText primary="La humedad de la estacion Nº3 esta ALTA" secondary="Marzo 5, 2021" />
      </ListItem>
    </List>
  );
}