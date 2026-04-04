import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import './styles/skill.css';

export const ItemSkill: React.FC<{key?:number, name?: string, title?: string, namespace?:string, description?: string, system?: string, owner?: string, tags?: string[]}> = ({key, name, namespace, title, description, system, owner, tags}) => { 


    const navigate = useNavigate();
    const stringTags = tags?.join(' ') ?? '';

    const onClickSkill = () => {
        navigate(`/catalog/${namespace}/component/${name}`);
    }

    return (
        <div>
            <button className='card-skill' onClick={onClickSkill} key={key}>
                <h3>{title}</h3>
                <p className='card-skill-system'>{system}</p>
                <div className='card-skill-tags'>
                    {tags?.map((tag) => <span className='card-skill-tag' key={tag}>{tag}</span>)}
                </div>
            </button>
        </div>
    );
}