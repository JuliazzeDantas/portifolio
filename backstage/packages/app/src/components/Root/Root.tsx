import { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
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

import './styles/style-sidebar.css';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage> 
    
      <Sidebar>
        <div className={"sidebar-style"}>
          <SidebarLogo />
          <SidebarGroup icon={<SearchIcon />} to="/search">
            <p className="engraved-text">Search</p>
            <SidebarSearchModal />
          </SidebarGroup>
          <SidebarDivider />
          <SidebarGroup label="Menu" icon={<MenuIcon />}>
            {/* Global nav, not org-specific */}
            <SidebarItem icon={HomeIcon} to="home" text="Profile" />
            <MyGroupsSidebarItem
              singularTitle="My Group"
              pluralTitle="My Groups"
              icon={GroupIcon}
            />
            <SidebarItem icon={MenuBook} to="catalog" text="Catalog">
              <SidebarSubmenu title="Catalog">
                  {/* <SidebarSubmenuItem  ===========> Tô sem ideias para substituir por enquanto
                    title="Domains"
                    to="catalog?filters[kind]=domain"
                    icon={useApp().getSystemIcon('kind:domain')}
                  /> */}
                  <SidebarSubmenuItem
                    title="Magic Schools"
                    to="catalog?filters[kind]=system"
                    icon={SchoolIcon}
                  />
                  <SidebarSubmenuItem
                    title="Skills"
                    to="catalog?filters[kind]=component"
                    icon={Star}
                  />
                  {/* <SidebarSubmenuItem  ===========> Tô sem ideias para substituir por enquanto
                    title="artifacts"
                    to="catalog?filters[kind]=api"
                    icon={useApp().getSystemIcon('kind:api')}
                  /> */}
                  {/* <SidebarDivider />   ===========> Tô sem ideias para substituir por enquanto
                  <SidebarSubmenuItem
                    title="Resources"
                    to="catalog?filters[kind]=resource"
                    icon={useApp().getSystemIcon('kind:resource')}
                  /> */}
                  <SidebarDivider />
                  <SidebarSubmenuItem
                    title="Team"
                    to="catalog?filters[kind]=group"
                    icon={useApp().getSystemIcon('kind:group')}
                  />
                  <SidebarSubmenuItem
                    title="User"
                    to="catalog?filters[kind]=user"
                    icon={useApp().getSystemIcon('kind:user')}
                  />
                </SidebarSubmenu>
              </SidebarItem>
            {/* <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" /> */}
            <SidebarItem icon={LibraryBooks} to="docs" text="Party" />
            <SidebarItem icon={Portal} to="create" text="Invocations" />
            {/* End global nav */}
            <SidebarDivider />
            <SidebarScrollWrapper>
              {/* Items in this group will be scrollable if they run out of space */}
            </SidebarScrollWrapper>
          </SidebarGroup>
          <SidebarSpace />
          <SidebarDivider />
          <NotificationsSidebarItem />
          <SidebarDivider />
          <SidebarGroup
            label="Settings"
            icon={<UserSettingsSignInAvatar />}
            to="/settings"
          >
            <SidebarSettings />
          </SidebarGroup>
        </div>  
      </Sidebar>
      {children}
  </SidebarPage>
);
