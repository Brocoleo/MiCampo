import styled from "styled-components";


export const SearchBox = styled.form`
display: flex;
flex-direction: row;
justify-content: space-evenly;
margin: 20px;
border: #171717 solid 1px;
border-radius: 2px;

& input {
  padding: 10px;
  font-size: 14px;
  border: none;
  outline: none;
  font-family: Montserrat;
  font-weight: bold;
}
& button {
  background-color: #171717;
  font-size: 14px;
  padding: 0 10px;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: Montserrat;
  font-weight: bold;
}
`;
export const ChooseCityLabel = styled.span`
color: white;
margin: 10px auto;
margin-bottom: 10%;
font-size: 18px;
font-weight: bold;
`;
export const WelcomeWeatherLogo = styled.img`
width: 140px;
height: 140px;
margin: 40px auto;
`;