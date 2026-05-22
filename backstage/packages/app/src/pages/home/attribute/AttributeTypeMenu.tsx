import React from 'react'

import botaoMenuActivate from '../images/plus.png';
import botaoMenuDeactivate from '../images/less.png';

import '../styles/attribute-box.css';


export const AttributeTypeMenu = ({ title, items}: {title: string, items:string[]}) => {
  
  const[ isOpen, setIsOpen ] = React.useState(false);
  const clickMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="attribute-item">
      <div className="attribute-item-menu-title">
        <p>{title}</p>
        <button onClick={clickMenu} className="drop-down-menu-button" type="button" aria-expanded={isOpen}>
          <img
            src={isOpen ? botaoMenuDeactivate : botaoMenuActivate}
            alt="Menu"
            style={isOpen ? { transform: 'rotate(180deg)', transition: 'transform 0.5s' } : { transition: 'transform 0.5s' }}
          />
        </button>
      </div>
      <div className={`attribute-item-menu-list${isOpen ? ' open' : ''}`}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
    </div>
  );
}