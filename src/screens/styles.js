import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

export default  makeStyles((theme) => ({
    root: {
      textAlign: '-webkit-center',
      boxSizing: 'border-box',
      ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
        marginTop: '18%',
      }
    },
  
  }));


  export const Container = styled.div`
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  border-radius: 30px;
  padding: 2px;
  box-shadow: 0 9px 12px 0 #134E5E;
  background: rgb(52,79,161);
  background: linear-gradient(90deg, rgba(52,79,161,1) 28%, rgba(63,54,151,1) 72%);
  font-family: Montserrat;
  @media (max-width: 768px) {
    margin-top: 9%;
  }
`;

export const MiniContainer = styled.div`
  margin-top: 2%;
  display: flex;
  padding: 2px;
  width: 380px;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 9px 12px 0 #134E5E;
  background: rgb(52,79,161);
  background: linear-gradient(90deg, rgba(52,79,161,1) 28%, rgba(63,54,151,1) 72%);
  font-family: Montserrat;
  `;

export const ChartContainer = styled.div`
margin-top: 5%;
display: flex;
padding: 9px;
width: 380px;
flex-direction: column;
align-items: center;
border-radius: 30px;
box-shadow: 0 9px 12px 0 #134E5E;
background: #fff;  
font-family: Montserrat;
@media (max-width: 768px) {
    margin-top: 9%;
  }
`;

export const InfoContainer = styled.div`
margin-top: 0%;
display: flex;
padding: 10px;
width: 380px;
flex-direction: column;
align-items: center;
border-radius: 30px;
box-shadow: 0 9px 12px 0 #134E5E;
background: #fff;  
font-family: Montserrat;
@media (max-width: 768px) {
    margin-top: 39%;
  }
`;

export const TituloInfo = styled.h2`
  margin-top: 10%;
  margin-bottom: 10%;
`;
