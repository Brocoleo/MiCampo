import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 350px;
  height: 100%;
  background: rgba(255,255,255,1);
  display: grid;
  align-items: center;
  top: 0;
  transition: 0.3s ease-in-out;
  left: ${({ isOpen }) => (isOpen ? '0' : '-1000px')};
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const CloseIcon = styled(FaTimes)`
  color: #000;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  border: transparent;
  font-size: 2rem;
  cursor: none;
  pointer-events: none;
  outline: none;
`;

export const SidebarMenu = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 90px);
  text-align: center;
  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(3, 80px);
  }
`;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: 300;
  font-family: 'Nunito', sans-serif;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #171717;
  cursor: pointer;
  &:hover {
    background:#D4ECDD ;
    color: #171717;
    transition: 0.2s ease-in-out;
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const SidebarRoute = styled(Link)`
  border-radius: 20px;
  background: #0F044C;
  white-space: nowrap;
  padding: 16px 64px;
  color: #fff;
  font-size: 1rem;
  font-weight:400;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: 0.2s ease-in-out;
    background: #787A91;
    color: #fff;
  }
`;