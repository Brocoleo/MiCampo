import styled from "styled-components";


export const WeatherInfoLabel = styled.span`
  margin: 8px 0px 0px;
  text-transform: none;
  text-align: center;
  width: 90%;
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
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
  font-family: 'Nunito', sans-serif;
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
  flex-direction: column;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;