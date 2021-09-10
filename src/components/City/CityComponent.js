import React from "react";
import Weather from "../Animations/Weather";
import { SearchBox, ChooseCityLabel} from "./styles";

const CityComponent = (props) => {
  const { updateCity, fetchWeather } = props;
  return (
    <>
    <ChooseCityLabel>Busca tu ciudad</ChooseCityLabel>
    <Weather />      
      <SearchBox onSubmit={fetchWeather}>
        <input
          onChange={(e) => updateCity(e.target.value)}
          placeholder="Ciudad"
        />
        <button type={"submit"}>Buscar</button>
      </SearchBox>
    </>
  );
};
export default CityComponent;
