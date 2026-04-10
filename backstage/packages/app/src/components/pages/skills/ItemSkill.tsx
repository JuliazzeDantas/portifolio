import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/skill.css';

export const ItemSkill: React.FC<{key?:number, name?: string, title?: string, namespace?:string, description?: string, system?: string, tags?: string[]}> = ({key, name, namespace, title, description, system, tags}) => { 

    const navigate = useNavigate();

    const onClickSkill = () => {
        navigate(`/catalog/${namespace}/component/${name}`);
    }

    return (
        <div>
            <button className='card-skill' onClick={onClickSkill} key={key}>
                <h3>{title}</h3>
                <p className='card-skill-system'>{system}</p>
                <p className='card-skill-description'>{description}</p>
                <div className='card-skill-tags'>
                    {tags?.map((tag) => <span className='card-skill-tag' key={tag}>{tag}</span>)}
                </div>
            </button>
        </div>
    );
}