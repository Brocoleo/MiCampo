import React from 'react';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarMenu,
  SidebarLink,
} from './styles';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        <SidebarLink to='/'>Perfil</SidebarLink>
        <SidebarLink to='/'>Configuraciones</SidebarLink>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;