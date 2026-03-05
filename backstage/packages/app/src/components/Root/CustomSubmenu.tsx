import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/style-submenu.css';

type Item = { 
  to: string; 
  label: string 
};

type CustomSubmenuProps = {
  submenu?: Item[];
};

export const CustomSubmenu: React.FC<CustomSubmenuProps> = ({ submenu = [] }: CustomSubmenuProps) => {
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
