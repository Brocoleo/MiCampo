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
import { FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        <SidebarLink to='/'><FaHome />&nbsp;&nbsp;INICIO</SidebarLink>
        <SidebarLink to='/informacion'><FaUser />&nbsp;&nbsp;PERFIL</SidebarLink>
        <SidebarLink to="/configuraciones" ><IoSettings />&nbsp;&nbsp;CONFIGURACION</SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute to='/login' onClick={() => {window.location.href="/login"}}>CERRAR SESION</SidebarRoute>
      </SideBtnWrap>
    </SidebarContainer>
  );
};

export default Sidebar;