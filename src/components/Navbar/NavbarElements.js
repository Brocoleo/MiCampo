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
export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding-right: 29px;
  padding: 20px;
  text-decoration: none;
  font-weight: 100;
  font-family: 'Tiro Kannada', serif;
  font-family: 'Titillium Web', sans-serif;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #334257;
  cursor: pointer;
  &:hover {
    background:#F7F7F7 ;
    color: #000;
    transition: 0.2s ease-in-out;
  }
  @media screen and (max-width: 1400px) {
    font-size: 1.2rem;
  }
`;