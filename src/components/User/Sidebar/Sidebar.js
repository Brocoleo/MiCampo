import React from 'react';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
  SidebarRoute
} from './styles';
import { FaUser } from "react-icons/fa";
import { IoPartlySunny } from "react-icons/io5";


const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        <SidebarLink to='/user/dash'><IoPartlySunny />&nbsp;&nbsp;ESTACION</SidebarLink>
        <SidebarLink to='/user/informacion'><FaUser />&nbsp;&nbsp;PERFIL</SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute to='/' onClick={() => {window.location.href="/"}}>CERRAR SESION</SidebarRoute>
      </SideBtnWrap>
    </SidebarContainer>
  );
};

export default Sidebar;