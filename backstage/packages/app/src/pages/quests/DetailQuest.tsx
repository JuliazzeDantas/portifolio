import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/float-window.css';

interface CloseWindowProps {
    CloseWindow: () => void;
    name?: string;
    title?: string;
    namespace?:string;
    description?: string;
    type?: string;
    status: 'completed' | 'failed' | 'in-progress';
    owner?: string;
}

export const QuestDetail: React.FC<CloseWindowProps> = ({CloseWindow, name, title, namespace, description, type, status, owner}) => {

    const navigate = useNavigate();
    const onCLickOwner = () => {
        navigate(`/catalog/default/group/${owner}`);
    }
    const onClickQuest = () => {
        navigate(`/catalog/${namespace}/component/${name}`);
    }

    return (
        <div className='float-window'>
            <div className='float-window-header'>
                <h2>{title} - [{type}]</h2>
                <button onClick={CloseWindow} style={{ cursor: 'pointer' }}>X</button>
            </div>
            <p className='float-window-description'>{description}</p>
            <div className='float-window-bottom'>
                <button onClick={onCLickOwner}>Owner: {owner}</button>
                <button onClick={onClickQuest}>Quest Detail</button>
                <p className={`float-window-status-${status}`}>{status.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase())}</p>  
            </div>
        </div>
    );
}