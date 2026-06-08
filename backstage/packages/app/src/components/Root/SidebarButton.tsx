

import { useState } from 'react';
import { SkillsSubmenu } from './CustomSubmenu';
import { useNavigate } from 'react-router-dom';

import './styles/style-button.css';

import { SkillSubmenu } from './SkillSubmenuGenerator';

export const SidebarButton = ({path, text, submenu = [] }: {path: string, text: string, submenu?: SkillSubmenu[] }) => {
  const navigate = useNavigate();
  const [submenuOpen, setSubmenuOpen] = useState(false);

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
  
    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button className="button engraved-text" onClick={handleClick}>
          {text}
        </button>
        {submenuOpen && (
          <div>
            <SkillsSubmenu submenu={submenu}/>
          </div>
        )}
      </div>
    );
  
};
