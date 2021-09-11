import React, { useState } from "react";
import Axios from "axios";
import Go from "./components/Go/Go";
import WeatherComponent from "./components/WheatherInfo/WeatherInfo";
import Water from "./components/Animations/Water";
import Navbar from "./components/Navbar/Navbar";
import Grid from '@material-ui/core/Grid';
import useStyles, { MiniContainer, Container, MiniContainer2 } from './styles'
import WeatherStation from "./components/WeatherStation/WeatherStation";



function App() {
  const classes = useStyles();
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c&lang=es`,
    );
    updateWeather(response.data);
  };
  return (
    <>

      {city && weather ? (
      <div className={classes.root}>
      <Grid container spacing={3}>
      <Navbar />
        <Grid item xs>
        <MiniContainer>
        <WeatherStation weather={weather} city={city}/>
        </MiniContainer>
        <MiniContainer2>
        <WeatherStation weather={weather} city={city}/>
        </MiniContainer2>
        </Grid>
        <Grid item xs>
        <Container>
        <WeatherComponent weather={weather} city={city}/>
        </Container>
        </Grid>
        
      </Grid>
    </div>
       
      ) : (
       <>
       <Navbar />
        <Water />    
        <Go updateCity={updateCity} fetchWeather={fetchWeather} />
        </> 
      )}
    
    </>

  );
}

export default App;
