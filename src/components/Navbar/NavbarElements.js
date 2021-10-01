import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';



export const NavIcon = styled.div`
  display: block;
  position: absolute;
  top: 20;
  right: 0;
  margin-right: 2%;
  cursor: pointer;
  color: #000;
  p {
    transform: translate(-175%, 100%);
    font-weight: bold;
  }
`;

export const Bars = styled(FaBars)`
  font-size: 2rem;
  transform: translate(-50%, -15%);
`;