import { Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import '../../core/core-styles/core-page.css';
import './styles/high-panel.css';
import './styles/medium-panel.css';
import './styles/low-panel.css';

import { DefaultPage } from '../../core/DefaultPage';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <DefaultPage titleHeader="Character Profile">
      <Grid item className="high-panel">
          <div className="photo-box"></div>
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
            <div className="attribute-body">Languages: Python, Typescript, Java</div>
            <div className="attribute-body">Front-end: React</div>
            <div className="attribute-body">Back-end: FastAPI</div>
            <div className="attribute-body">Infra: Kubernetes </div>
          </div>
          <div className="project-box">
            <div className='project-title'>Type of Magics</div>
            <div className='project-row'>
              <button className='project-button'>Web Scraping</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div>
            <div className='project-row'>
              <button className='project-button'>Kubernetes</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div>
            <div className='project-row'>
              <button className='project-button'>CI/CD</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div>
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div>  
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            <div className='project-row'>
              <button className='project-button' onClick={() => navigate('/catalog')}>FastAPI</button>
              <div className='project-description'>Project 1 -----------------------------------dasdiosajfiosjafiojsafoisjdfoisjdoij</div>
            </div> 
            
          </div>
        </Grid>
    </DefaultPage>
  );
};