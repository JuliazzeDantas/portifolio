import React from 'react';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import { Link, useSidebarOpenState } from '@backstage/core-components';
import './styles/style-sidebar.css';


export const SidebarLogo = () => {
  const { isOpen } = useSidebarOpenState();
  return (
    <div className="sidebar-logo-root">
      <Link to="/" underline="none" className="sidebar-logo-link" aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};