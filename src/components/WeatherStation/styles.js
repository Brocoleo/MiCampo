import styled from "styled-components";



export const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: none;
  text-align: center;
  width: 90%;
  font-family: 'Oswald', sans-serif;
  font-weight: 400;
  font-size: 23px;
  color: #fff;
`;
export const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;

`;
export const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  color:white;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
export const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
export const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
export const InfoLabel = styled.span`
  display: flex;
  font-family: 'Oswald', sans-serif;
  flex-direction: column;
  font-size: 15px;
  margin: 10px;
  & span {
    font-size: 18px;
    text-transform: capitalize;
  }
`;