import { Grid } from '@material-ui/core';
import { useState } from 'react';

import '../../core/core-styles/core-page.css';
import './styles/high-panel.css';
import './styles/medium-panel.css';
import './styles/skill-box.css';
import './styles/attribute-box.css';

import photo from './images/profile2.png'
import botaoMenuActivate from './images/plus.png';
import botaoMenuDeactivate from './images/less.png';

import { DefaultPage } from '../../core/DefaultPage';
import { SkillTypeGenerator } from './SkillTypeGenerator';

const AttributeItemMenu = ({ title, items}: {title: string, items:string[]}) => {
  
  const[ isOpen, setIsOpen ] = useState(false);
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



export const HomePage = () => {

  
  return (
    <DefaultPage titleHeader="Character Profile">
      <Grid item className="high-panel">
          <div className="photo-box" >
            <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="basic-information">
            <ul>
              <li key="name" >Name: Vinícius Juliasse Dantas</li>
              <li key="race">Race: Human</li>
              <li key="gender">Gender: Male</li>
              <li key="class">Class: Tech Mage</li>
              <li key="Arcane Tradition">Arcane Tradition: Platform Engineer</li>
              <li key="school">School of Magic: Bachelor of Science and Tecnology - UNIFESP</li>
              <li key="level">Level: 7</li>
            </ul>
          </div>
        </Grid>
        <Grid item className="medium-panel">
          <div className="attribute-box">
            <div className="title">Attributes</div>
            <div className="attribute-body">
              <AttributeItemMenu title="Languages" items={['Python', 'Java', 'TypeScript']} />
              <AttributeItemMenu title="Front-end" items={['React']} />
              <AttributeItemMenu title="Back-end" items={['Node.js', 'FastAPI']} />
              <AttributeItemMenu title="DevOps" items={['Kubernetes', 'Docker', 'Azure', 'CI/CD (GitHub Actions)', 'Grafana/Prometheus']} />
            </div>
          </div>
          <div className="skill-box">
            <div className='title'>Type of Magics</div>
            <div className='skill-body'>
              
              <SkillTypeGenerator />
              
            </div>
          </div>
        </Grid>
    </DefaultPage>
  );
};