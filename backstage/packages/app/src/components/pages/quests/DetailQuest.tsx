import React from 'react'

import './styles/float-window.css'

interface CloseWindowProps {
    CloseWindow: () => void;
    title: string;
    description: string;
    type: 'Role' | 'Project';
    status: 'completed' | 'failed' | 'in-progress';
}

export const QuestDetail: React.FC<CloseWindowProps> = ({CloseWindow, title, description, type, status}) => {
    return (
        <div className='float-window'>
            <div className='float-window-header'>
                <h2>{title} - {type}</h2>
                <button onClick={CloseWindow}>X</button>
            </div>
            <p>{description}</p>
            <p className={`float-window-status-${status}`}>{status.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase())}</p>
        
        </div>
    );
}