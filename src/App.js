import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./components/City/CityComponent";
import WeatherComponent from "./components/WheatherInfo/WeatherInfo";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 30px;
  box-shadow: 0 3px 6px 0 #334257;
  background: #2a329e;
  font-family: Montserrat;
`;



function App() {
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
    <Container>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
    </Container>
  );
}

export default App;
