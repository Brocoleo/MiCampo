import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export const NavIcon = styled.div`
  display: block;
  position: absolute;
  top: 30;
  left: 0;
  margin-left: 6%;
  color: #171717;
  p {
    transform: translate(-175%, 100%);
    font-weight: 300;
  }
`;

export const Bars = styled(FaBars)`
  margin-top: 10px;
  font-size: 2rem;
  transform: translate(-50%, -15%);
`;


export const IconLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 12%;

`;