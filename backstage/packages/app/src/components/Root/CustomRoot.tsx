import React, { PropsWithChildren } from 'react';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  SidebarGroup,
  SidebarScrollWrapper,
  SidebarPage,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';
import SearchIcon from '@material-ui/icons/Search';
// import { NotificationsSidebarItem } from '@backstage/plugin-notifications';
// import { useApp } from '@backstage/core-plugin-api';
import { useNavigate } from 'react-router-dom';


import './styles/style-sidebar.css';
import './styles/style-button.css';
import './styles/style-submenu.css';

import { SkillsSubmenu } from './CustomSubmenu';

type Item = { to: string; label: string };


const SidebarLogo = () => {
  const { isOpen } = useSidebarOpenState();
  return (
    <div className="sidebar-logo-root">
      <Link to="/" underline="none" className="sidebar-logo-link" aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};



const SidebarButton = ({path, text, submenu = [] }: {path: string, text: string, submenu?: Item[] }) => {
  const navigate = useNavigate();
  const [submenuOpen, setSubmenuOpen] = React.useState(false);

  const handleMouseEnter = () => setSubmenuOpen(true);
  const handleMouseLeave = () => setSubmenuOpen(false);
  const handleClick = () => navigate(path);

  if (submenu.length === 0) {
    return (
      <button className="button engraved-text" onClick={handleClick}>
        {text}
      </button>
    );
  }
  else{
    return (
      <div style={{ position: 'relative', width: '100%' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button className="button engraved-text" style={{ width: '100%' }} onClick={handleClick}>
          {text}
        </button>
        {submenuOpen && (
          <div>
            <SkillsSubmenu submenu={submenu}/>
          </div>
        )}
      </div>
    );
  }
};


export const CustomRoot = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage > 
      <Sidebar> 
        <div className={"sidebar-style"}>
          <SidebarLogo />
          <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
            <SidebarSearchModal /> {/* Vou deixar o search baseado no Backstage, poi sé mais simples*/}
          </SidebarGroup>
          <hr className={"sidebar-divider"}/>
          <SidebarGroup label="Character">
            <SidebarButton path="/home" text="Character" />
            <SidebarButton path="/inventory" text="Inventory" />
            <SidebarButton path="/catalog" text="Skills" submenu={[{to: '/home', label: 'Webscrapping'}, {to: '/home', label: 'APIs'}, {to: '/home', label: 'CI/CD'}, {to: '/home', label: 'Kubernetes'}]} />
            <SidebarButton path="/docs" text="Docs" />
            <SidebarScrollWrapper>
              {/* Items in this group will be scrollable if they run out of space */}
            </SidebarScrollWrapper>
          </SidebarGroup>
          <SidebarGroup label='settings'>
            <SidebarScrollWrapper>
              {/* Items in this group will be scrollable if they run out of space */}
            </SidebarScrollWrapper>

            
            <hr className={"sidebar-divider"}/>
            <SidebarButton path="/settings" text="Settings" />
          </SidebarGroup>

        </div>  
      </Sidebar>
      {children}
  </SidebarPage>
);
