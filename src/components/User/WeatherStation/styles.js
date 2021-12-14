import styled from "styled-components";



export const WeatherInfoLabel = styled.span`
  margin-top: 15px;
  text-transform: uppercase;
  text-align: center;
  color: #ffff;
  font-family: 'Nunito', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  @media (max-width: 768px) {
    width: 77%;
    margin-top: 15px;
  }
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
  width: 100%;
  color:white;
  flex-direction: row;
  margin: 3px;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
export const InfoContainer = styled.div`
  display: flex;
  margin: 3px 0px;
  padding: 7px;
  flex-direction: row;
  margin: 15px;
  justify-content: space-evenly;
  align-items: center;
`;
export const InfoIcon = styled.img`
  width: 41px;
  height: 31px;
  margin-right: 15px;
  @media (max-width: 1400px) {
    width: 46px;
    height: 36px;
    padding: 2px;
  }
`;
export const InfoLabel = styled.span`
  display: flex;
  font-family: 'Nunito', sans-serif;
  flex-direction: column;
  font-size: 16px;
  padding: 6px;
  font-weight: 500;
  & span {
    font-size: 18px;
    text-transform: capitalize;
  }
  @media (max-width: 1400px) {
    font-size: 16px;
    padding: 2px;
  }
`;