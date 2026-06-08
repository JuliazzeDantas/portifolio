import { PropsWithChildren } from 'react';
import {
  Sidebar,
  SidebarGroup,
  SidebarPage,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { useEffect, useState } from 'react';

import './styles/style-sidebar.css';
import './styles/style-button.css';
import './styles/style-submenu.css';

import { SidebarButton } from './SidebarButton';
import { BottomSection } from './BottomSection';
import { SidebarLogo } from './SidebarLogo';

import { SkillSubmenu, skillSubmenuGenerator } from './SkillSubmenuGenerator';


export const CustomRoot = ({ children }: PropsWithChildren<{}>) => {
  const catalog = useApi(catalogApiRef);
  const [submenu, setSubmenu] = useState<SkillSubmenu[]>([]);

  useEffect(() => {
    const fetchSubmenu = async () => {
      const generatedSubmenu = await skillSubmenuGenerator(catalog);
      setSubmenu(generatedSubmenu ?? []);
    }
    fetchSubmenu();
  }, [catalog]);

  return (
    <SidebarPage > 
        <Sidebar> 
          <div className="sidebar-style">
            <SidebarLogo />
            {/* <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
              <SidebarSearchModal /> Vou deixar o search baseado no Backstage, poi sé mais simples
            </SidebarGroup> */}
            <hr className="sidebar-divider"/>
            <SidebarGroup label="Character">
              <SidebarButton path="/home" text="Character" />
              <SidebarButton path="/inventory" text="Inventory" />
              <SidebarButton path="/skills" text="Skills" submenu={submenu} />
              <SidebarButton path="/quests" text="Quests" />
              <SidebarButton path="/invocation" text="Invocation" />
              <SidebarButton path="/docs" text="Docs" />
              <SidebarButton path="/catalog" text="Catalog" />
            </SidebarGroup>
            <BottomSection>
              <hr className="sidebar-divider"/>
              <SidebarButton path="/settings" text="Settings"/>
            </BottomSection>

          </div>  
        </Sidebar>
        {children}
    </SidebarPage>
  );
};
