import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/style-submenu.css';

type Item = { to: string; label: string };

type SkillsSubmenuProps = {
  submenu?: Item[];
};

export const SkillsSubmenu: React.FC<SkillsSubmenuProps> = ({ submenu = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="submenu">
      {submenu.map((item, idx) => (
        <div key={idx} className="submenu-item" onClick={() => navigate(item.to)}>
          {item.label}
        </div>
      ))}
    </div>
  );
};
