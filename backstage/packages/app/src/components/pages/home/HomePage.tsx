import { Grid } from '@material-ui/core';

import '../../core/core-styles/core-page.css';
import './styles/high-panel.css';
import './styles/medium-panel.css';
import './styles/low-panel.css';

import photo from './images/profile2.png'

import { DefaultPage } from '../../core/DefaultPage';
import { SkillTypeGenerator } from './SkillTypeGenerator';

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
            <div className="attribute-title">Attributes</div>
            <div className="attribute-body">
              <h1>Languages: </h1>
              <p>Python</p>
              <p>Java</p>
              <p>TypeScript</p>
            </div>
            <div className="attribute-body">
              <h1>Front-end:</h1>
              <p>React</p>
            </div>
            <div className="attribute-body">
              <h1>Back-end:</h1>
              <p>FastAPI</p>
            </div>
            <div className="attribute-body">
              <h1>DevOps:</h1>
              <p>Kubernetes</p>
              <p>Docker</p>
              <p>Azure</p>
              <p>CI/CD (GitHub Actions)</p>
              <p>Grafana/Prometheus</p>
            </div>
          </div>
          <div className="skill-box">
            <div className='skill-title'>Type of Magics</div>
            <div className='skill-body'>
              <SkillTypeGenerator />
            </div>
          </div>
        </Grid>
    </DefaultPage>
  );
};