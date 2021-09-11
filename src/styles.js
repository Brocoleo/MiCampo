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
  margin-top: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  border-radius: 30px;
  padding: 2px;
  box-shadow: 0 6px 9px 0 #5F7A61;
  background: #2a329e;
  font-family: Montserrat;
  @media (max-width: 768px) {
    margin-top: 9%;
  }
`;

export const MiniContainer = styled.div`
display: flex;
padding: 1px;
width: 90%;
height: 50%;
flex-direction: column;
align-items: center;
border-radius: 30px;
box-shadow: 0 6px 9px 0 #5F7A61;
background: #184D47;
font-family: Montserrat;
`;
export const MiniContainer2 = styled.div`
display: flex;
padding: 7px;
width: 90%;
height: 50%;
flex-direction: column;
margin-top: 5%;
align-items: center;
border-radius: 30px;
box-shadow: 0 6px 9px 0 #5F7A61;
background: #184D47;
font-family: Montserrat;
`;

