import styled from "styled-components";



export const WeatherInfoLabel = styled.span`
  margin-top: 15px;
  text-transform: uppercase;
  text-align: center;
  color: #ffff;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  @media (max-width: 768px) {
    width: 77%;
    margin-top: 15px;
  }
`;

export const WeatherInfoSub = styled.span`
  margin-top: 5px;
  text-transform: uppercase;
  text-align: center;
  color: #ffff;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    width: 77%;
    margin-top: 10px;
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
  margin: 0px 0px;
  padding: 2px;
  padding-right: 35px;
  flex-direction: row;
  margin: 20px;
  border-radius: 10px;
  color: #fff;
  background: #3E497A;
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  justify-content: space-evenly;
  align-items: center;
  @keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
`;
export const InfoIcon = styled.img`
  width: 46px;
  height: 36px;
  margin-right: 15px;
  @media (max-width: 1400px) {
    width: 46px;
    height: 36px;
    padding: 2px;
  }
`;
export const InfoLabel = styled.span`
  display: flex;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  flex-direction: column;
  font-size: 17px;
  padding: 3px;
  font-weight: 700;
  & span {
    font-size: 18px;
    text-transform: capitalize;
  }
  @media (max-width: 1400px) {
    font-size: 16px;
    padding: 2px;
  }
`;