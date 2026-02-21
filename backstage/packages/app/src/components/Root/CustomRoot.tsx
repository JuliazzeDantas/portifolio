import { PropsWithChildren } from 'react';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  SidebarGroup,
  SidebarScrollWrapper,
  SidebarPage,
} from '@backstage/core-components';
import SearchIcon from '@material-ui/icons/Search';

import './styles/style-sidebar.css';
import './styles/style-button.css';
import './styles/style-submenu.css';

import { SidebarButton } from './SidebarButton';
import { BottomSection } from './BottomSection';
import { SidebarLogo } from './SidebarLogo';

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
            <SidebarButton path="/quests" text="Quests" />
            <SidebarButton path="/invocation" text="Invocation" />
            <SidebarButton path="/docs" text="Docs" />
            <SidebarScrollWrapper>
              {/* Items in this group will be scrollable if they run out of space */}
            </SidebarScrollWrapper>
          </SidebarGroup>
          <BottomSection>
            <hr className={"sidebar-divider"}/>
            <SidebarButton path="/settings" text="Settings" />
          </BottomSection>

        </div>  
      </Sidebar>
      {children}
  </SidebarPage>
);
