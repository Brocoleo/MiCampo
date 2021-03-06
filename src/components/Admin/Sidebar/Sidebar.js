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

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        <SidebarLink to='/admin/dash'><FaHome />&nbsp;&nbsp;INICIO</SidebarLink>
        <SidebarLink to='/admin/usuarios'><FaUsers />&nbsp;&nbsp;USUARIOS</SidebarLink>
        <SidebarLink to='/admin/sensores'>< FaMicrochip/>&nbsp;&nbsp;SENSORES</SidebarLink>
        <SidebarLink to='/admin/monitoreo'><IoPartlySunny />&nbsp;&nbsp;MONITOREO </SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute to='/' onClick={() => {window.location.href="/"}}>CERRAR SESIÓN</SidebarRoute>
      </SideBtnWrap>
    </SidebarContainer>
  );
};

export default Sidebar;