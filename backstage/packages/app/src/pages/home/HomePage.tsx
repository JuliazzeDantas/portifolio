import { Grid } from '@material-ui/core';
import './styles/high-panel.css';
import './styles/medium-panel.css';
import './styles/skill-box.css';


import photo from './images/profile2.png'


import { DefaultPage } from '../../components/core/DefaultPage';
import { SkillTypeGenerator } from './SkillTypeGenerator';
import { AttributeColumn } from './attribute/AttributeColumn';


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
            <AttributeColumn/>
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