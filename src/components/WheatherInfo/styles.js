import styled from "styled-components";

export const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 4vh;
  color:white;
  font-weight: bold;
`;
export const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  color: #EEEEEE;
  & span {
    font-size: 28px;
  }
`;
export const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: none;
  text-align: center;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
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
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;