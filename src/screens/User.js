import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import WeatherComponent from "../components/WheatherInfo/WeatherInfo";
import Assistant from '../components/Assistent/Assistent'
import useStyles, { MiniContainer, Container, ChartContainer} from './styles'
import Navbar from "../components/Navbar/Navbar";
import LineChart from "../components/LineChart/LineChart";
import Sidebar from "../components/Sidebar/Sidebar";
import WeatherStation from "../components/WeatherStation/WeatherStation";


const User = ({weather, city, toggle, isOpen}) => {
    const classes = useStyles();
    
    const temperatura = {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        datasets: [
          {
            label: 'temperatura de la estacion',
            data: [2, 14, 7, 15, 2, 6],
            fill: true,
            backgroundColor: 'rgba(255, 38, 38, 0.2)',
            borderColor: 'rgb(255, 38, 28)',
          },
        ],
      };
      const humedad = {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        datasets: [
          {
            label: 'humedad de la estacion',
            data: [12, 19, 3, 5, 2, 3],
            fill: true,
            backgroundColor: 'rgba(20, 39, 155,0.2)',
            borderColor: 'rgb(20, 39, 155)',
          },
        ],
      };
    return (
        <div className={classes.root}>
        <Router>
        <Grid container spacing={6}>
        <Navbar  toggle={toggle}/>
        <Sidebar isOpen={isOpen} toggle={toggle} />
          <Grid item xs>
          <MiniContainer>
          <WeatherStation weather={weather} city={city}/>
          <Assistant/>
          </MiniContainer>      
          </Grid>
  
          <Grid item xs>
          <Container>
          <WeatherComponent weather={weather} city={city}/>
          </Container>
           
          </Grid>
          <Grid item xs>
          <ChartContainer>
            <LineChart title='Humedad' data={humedad} icono={false}/>
          </ChartContainer>
          <ChartContainer>
            <LineChart title='Temperatura' data={temperatura} icono={true}/>
          </ChartContainer>
          </Grid>        
        </Grid>
        </Router>
      </div>
    )
}

export default User
