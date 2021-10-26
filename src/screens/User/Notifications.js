import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FadeIn from 'react-fade-in';

export default function AlignItemsList() {
  return (
    <div >
    <FadeIn>
    <List sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <Alert severity="error" icon={false}  sx={{ width: '100%%' }}><AlertTitle> Temperatura ALTA</AlertTitle><Avatar alt="Remy Sharp" src="/icons/termometro.svg" sx={{ width: 30, height: 30 }}/>La estacion Nº2 supero los 35C <br /> Abril 17, 2021</Alert>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <Alert severity="warning"  icon={false} sx={{ width: '100%' }}><AlertTitle>Ventisca</AlertTitle> <Avatar alt="Travis Howard" src="icons/wind.svg"  sx={{ width: 30, height: 30 }}/>El viento supero los 2500mph<br /> Mayo 8, 2021</Alert>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <Alert severity="info" icon={false} sx={{ width: '100%' }}><AlertTitle>Humedad BAJA</AlertTitle><Avatar alt="Cindy Baker" src="/icons/humidity.svg"  sx={{ width: 30, height: 30 }}/>La estacion Nº2 esta bajo del 15%<br /> Marzo 15, 2021</Alert>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <Alert severity="info" icon={false} sx={{ width: '100%' }}><AlertTitle>Temperatura BAJA</AlertTitle><Avatar alt="Remy Sharp" src="/icons/termometro.svg"  sx={{ width: 30, height: 30 }}/>La estacion Nº1 bajo los 12C<br /> Marzo 3, 2021</Alert>
      </ListItem>

      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <Alert severity="error" icon={false}  sx={{ width: '100%' }}><AlertTitle>Humedad ALTA</AlertTitle><Avatar alt="Cindy Baker" src="/icons/humidity.svg"  sx={{ width: 30, height: 30 }}/>La estacion Nº3 supero el 20% <br /> Abril 17, 2021</Alert>
      </ListItem>
    </List>
    </FadeIn>
    </div>
  );
}