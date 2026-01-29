import { PropsWithChildren } from 'react';

import HomeIcon from '@material-ui/icons/Home';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarSubmenu,
  SidebarSubmenuItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SchoolIcon from '@material-ui/icons/School';
import Star from '@material-ui/icons/Star';
import MenuBook from '@material-ui/icons/MenuBook';
import GroupIcon from '@material-ui/icons/People';
import Portal from '@material-ui/icons/BlurOn';
import { MyGroupsSidebarItem } from '@backstage/plugin-org';
import { NotificationsSidebarItem } from '@backstage/plugin-notifications';
import { useApp } from '@backstage/core-plugin-api';

import { useNavigate } from 'react-router-dom';

import './styles/style-sidebar.css';
import './styles/style-button.css';


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


const SidebarButton = ({path, text }: {path: string, text: string }) => {
  const navigate = useNavigate();
  return (
    <button className="button engraved-text" onClick={() => navigate(path)}>
      {text}
    </button>
  );
};

export const CustomRoot = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage> 
      <Sidebar> 
        <div className={"sidebar-style"}>
          <SidebarLogo />
          <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
            <SidebarSearchModal /> {/* Vou deixar o search baseado no Backstage, poi sé mais simples*/}
          </SidebarGroup>
          <hr className={"sidebar-divider"}/>
          <SidebarGroup label="Character">
            <SidebarButton path="/home" text="Character" />
            <SidebarButton path="/catalog" text="Inventory" />
            <SidebarButton path="/catalog" text="Magics" />
            <SidebarButton path="/docs" text="Docs" />
          </SidebarGroup>

        </div>  
      </Sidebar>
      {children}
  </SidebarPage>
);
