import { useState } from 'react';
import { createPortal } from 'react-dom';

import './styles/quest.css';
import { QuestDetail } from './DetailQuest';

export const ItemQuest: React.FC<{name?: string, title?: string, namespace?:string, description?: string, status: 'completed' | 'failed' | 'in-progress', type?: string, owner?: string}> = ({name, status, namespace, title, description, type, owner}) => { 

    const [FloatWindowOpen, setFloatWindowOpen] = useState(false);

    const openFloatWindow = () => setFloatWindowOpen(true);
    const closeFloatWindow = () => setFloatWindowOpen(false);

    return (
        <div>
            <button className='card-quest' onClick={openFloatWindow}>
                <h3 className='card-quest-title'>[{type}] - {title}</h3>
                <p className={`card-quest-status-${status}`}>{status.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase())}</p>
            </button>
            {
                FloatWindowOpen && createPortal(
                    <div className='modal-orverlay'>
                        <QuestDetail CloseWindow={closeFloatWindow} title={title} name={name} description={description} type={type} status={status} owner={owner} namespace={namespace}/>
                    </div>,
                    document.querySelector('.container') as HTMLElement // Pega como referencia o .container para poder cobrir todo ele com o modelpverlay
                )
            }
        </div>
    );
}