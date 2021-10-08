import React, { useState } from "react";
import Axios from "axios";
import User from "./screens/User";
import Login from "./screens/Login";

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

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="code">
      {city && weather ? ( <User weather={weather} city={city} toggle={toggle} isOpen={isOpen}/>  ) 
      : ( <Login isOpen={isOpen} toggle={toggle} updateCity={updateCity} fetchWeather={fetchWeather}/>)}
  
    </div>

  );
}

export default App;
