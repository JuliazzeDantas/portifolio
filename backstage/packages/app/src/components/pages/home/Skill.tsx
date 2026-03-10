import React from "react"
import { useNavigate } from 'react-router-dom';

import './styles/medium-panel.css';

export type SkillType = {
    name: string
    namespace: string
    description: string
}

export const Skill: React.FC<SkillType> = ({name, namespace, description}: SkillType) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/catalog/${namespace}/system/${name}`);
    }

    return (
        <div className='skill-type'>
            <button className='skill-button' onClick={onClick}>{name}</button>
            <p>{description}</p>
        </div>
    )
}