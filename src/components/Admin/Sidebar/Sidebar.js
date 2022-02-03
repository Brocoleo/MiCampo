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
import { FaUsers } from "react-icons/fa";
import { IoPartlySunny } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        <SidebarLink to='/admin'><FaHome />&nbsp;&nbsp;INICIO</SidebarLink>
        <SidebarLink to='/usuarios'><FaUsers />&nbsp;&nbsp;USUARIOS</SidebarLink>
        <SidebarLink to='/sectores'><IoPartlySunny />&nbsp;&nbsp;SECTORES</SidebarLink>
        <SidebarLink to='/estaciones'><FaMicrochip />&nbsp;&nbsp;ESTACIONES</SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute to='/' onClick={() => {window.location.href="/"}}>CERRAR SESION</SidebarRoute>
      </SideBtnWrap>
    </SidebarContainer>
  );
};

export default Sidebar;