import React from 'react';

import './styles/quest.css';
import { QuestDetail } from './DetailQuest';

export const ListQuest: React.FC<{status: 'completed' | 'failed' | 'in-progress', title: string, description: string, type: 'Role' | 'Project'}> = ({status, title, description, type}) => { 

    const [FloatWindowOpen, setFloatWindowOpen] = React.useState(false);

    const openFloatWindow = () => setFloatWindowOpen(true);
    const closeFloatWindow = () => setFloatWindowOpen(false);

    return (
        <div>
            <button className='card-quest' onClick={openFloatWindow}>
                <h3 className='card-quest-title'>[{type}] - {title}</h3>
                <p className={`card-quest-status-${status}`}>{status.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase())}</p>
            </button>
            {
                FloatWindowOpen && (
                    <div className='modal-orverlay' >
                        <QuestDetail CloseWindow={closeFloatWindow} title={title} description={description} type={type} status={status} />
                    </div>
                )
            }
        </div>
    );
}