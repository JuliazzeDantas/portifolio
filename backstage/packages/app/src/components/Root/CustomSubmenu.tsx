import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/style-submenu.css';

import { SkillSubmenu } from './SkillSubmenuGenerator';

type SkillsSubmenuProps = {
  submenu?: SkillSubmenu[];
};

export const SkillsSubmenu: React.FC<SkillsSubmenuProps> = ({ submenu = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="submenu">
      {submenu.map((item, idx) => (
        <div key={idx} className="submenu-item" onClick={() => navigate(item.to)}>
          {item.system}
        </div>
      ))}
    </div>
  );
};
