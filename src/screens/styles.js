import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import { Link } from 'react-router-dom';

export default  makeStyles((theme) => ({
    root: {
      textAlign: '-webkit-center',
      boxSizing: 'border-box',
      ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
        marginTop: '18%',
      }
    },
    admin: {
      marginTop: '5%',
      textAlign: '-webkit-center',
      boxSizing: 'border-box',
      ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
        marginTop: '18%',
      }
    },
  image: {
    padding: '4px'
  },
  marginTop: {
      marginTop: '10px',
  },
  
  }));





export const NotificationsContainer = styled.div`
display: flex;
margin-top: 5%;
width: 50%;
padding: 28px;
flex-direction: column;
align-items: center;
border-radius: 20px;
color: #fff;
box-shadow: 0 3px 6px 0 #031648;
background-color: #031648;
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;

@media (max-width: 768px) {
  width: 72%;
  margin-top: 9%;
  margin-left: 5%;
}

@media only screen and (min-width: 768px) and (max-width: 1424px) {
  width: 60%;
  margin-top: 3%;
  margin-left: 5%;
}
`;

export const AsistenteContainer = styled.div`
padding-bottom:1%;
display: flex;
width: 55%;
padding: 10px;
padding-left: 15px;
padding-right: 15px;
flex-direction: column;
align-items: center;
border-radius: 20px;
color: #fff;
border: 3px solid #464b50;
box-shadow: 0 9px 12px 0 #031648;
background: #30363d;
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;

@media only screen and (max-width: 768px) {
  width: 72%;
  margin-top: 9%;
  margin-left: 5%;
}

@media only screen and (min-width: 768px) and (max-width: 1424px) {
  width: 77%;
  margin-top: 3%;
  margin-left: 5%;
}
`;

export const WeatherContainer = styled.div`
margin-top:0px;
margin-bottom:10px;
display: flex;
width: 60%;
flex-direction: column;
align-items: center;
border-radius: 20px;
box-shadow: 0 3px 6px 0 #031648;
background-color: #031648;
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;
@media (max-width: 768px) {
  width: 77%;
  margin-left: 5%;
}

`;

export const WeatherUserContainer = styled.div`
margin-top:40px;
margin-bottom:10px;
display: flex;
width: 80%;
flex-direction: column;
align-items: center;
border-radius: 20px;
box-shadow: 0 3px 6px 0 #031648;
background-color: #031648;
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;
@media (max-width: 768px) {
  width: 77%;
  margin-top: 22%;
  margin-left: 5%;
}

`;

export const ChartContainer = styled.div`
margin-top:0px;
margin-bottom:10px;
padding: 6px;
display: blocks;
font-size: 0.5rem;
margin-left: 60px;
width: 70%;
flex-direction: column;
align-items: center;
border-radius: 20px;
box-shadow: 0 9px 12px 0 #031648;
border: 3px solid #F3F1F5;
background: #fff;  
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;


`;

export const InfoContainer = styled.div`
display: flex;
padding: 8px;
margin-top: -1px;
width: 380px;
flex-direction: column;
align-items: center;
border-radius: 20px;
box-shadow: 0 9px 12px 0 #031648;
background: #fff;  
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;
@media (max-width: 768px) {
    margin-top: 39%;
  }
`;



export const TituloLogin = styled.h2`
  margin-bottom: 2%;
  font-weight: 100;
  font-size: 34px;
  color: #334257;
`;

export const TituloRegister = styled.h2`
  margin: 0px;
  padding: 0px;
  font-weight: 100;
  font-size: 24px;
  color: #334257;
`;

export const pRegister = styled.p`
  margin: 0px;
  padding: 0px;
`;

export const CardUsers = styled.div`
  margin-top:3%;
  display: flex;
  padding: 0px;
  width: 280px;
  height: 300px;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 6px 9px 0 #031648;
  background: #00c6ff;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #0072ff, #00c6ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;
  @media (max-width: 768px) {
    width: 300px;
    margin-top: 9%;
    margin-left: 25%;
  }
  `;

export const CardEstaciones = styled.div`
margin-top:3%;
display: flex;
padding: 0px;
width: 280px;
height: 300px;
margin-left: 10%;
flex-direction: column;
align-items: center;
border-radius: 20px;
box-shadow: 0 6px 9px 0 #031648;
background: rgb(217,140,0);
background: linear-gradient(90deg, rgba(217,140,0,1) 47%, rgba(255,164,0,1) 79%);
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;
@media (max-width: 768px) {
  width: 300px;
  margin-top: 9%;
  margin-left: 25%;
}
`;

export const CardSensores = styled.div`
margin-top:3%;
display: flex;
padding: 0px;
width: 280px;
height: 300px;
margin-left: 20%;
flex-direction: column;
align-items: center;
border-radius: 20px;
box-shadow: 0 6px 9px 0 #031648;
background: #8E2DE2;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
font-family: 'Tiro Kannada', serif;
font-family: 'Titillium Web', sans-serif;
@media (max-width: 768px) {
  width: 300px;
  margin-top: 9%;
  margin-left: 25%;
}
`;

export const DataUsers = styled.span`
  margin: 20px 25px 10px;
  text-transform: none;
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: center;
  border-radius:25px;
  background-color: #00c6ff;
  width: 40%;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 300;
  font-size: 1.6rem;
  color: #fff;
`;

export const DataEstacion = styled.span`
  margin: 20px 25px 10px;
  text-transform: none;
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: center;
  border-radius:25px;
  background-color: rgba(255,164,0,1);
  width: 40%;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 300;
  font-size: 1.6rem;
  color: #fff;
`;

export const DataSensores = styled.span`
  margin: 20px 25px 10px;
  text-transform: none;
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: center;
  border-radius:25px;
  background-color: #8E2DE2;
  width: 40%;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 300;
  font-size: 1.6rem;
  color: #fff;
`;

export const DataLabel = styled.span`
  text-transform: none;
  text-align: center;
  width: 100%;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 300;
  font-size: 1.4rem;
  color: #fff;
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;