import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';



export const NavIcon = styled.div`
  display: block;
  position: absolute;
  top: 30;
  left: 0;
  margin-left: 8%;
  color: #000;
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