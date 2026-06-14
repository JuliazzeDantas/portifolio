import { useState } from 'react';
import { createPortal } from 'react-dom';

import './styles/quest.css';
import { QuestDetail } from './DetailQuest';
import { ListCard } from '../../components/table/ListCard';

export const ItemQuest: React.FC<{name?: string, title?: string, namespace?:string, description?: string, status: 'completed' | 'failed' | 'in-progress', type?: string, owner?: string, tags?: string[]}> = ({name, status, namespace, title, description, type, owner, tags}) => { 

    const [FloatWindowOpen, setFloatWindowOpen] = useState(false);

    const openFloatWindow = () => setFloatWindowOpen(true);
    const closeFloatWindow = () => setFloatWindowOpen(false);

    const prettyStatus = status.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase());

    return (
        <>
            <ListCard
                title={title}
                system={type}
                tags={tags}
                onClick={openFloatWindow}
                third={<span className={`card-quest-status-${status}`}>{prettyStatus}</span>}
            />
            {
                FloatWindowOpen && createPortal(
                    <div className='modal-overlay'>
                        <QuestDetail CloseWindow={closeFloatWindow} title={title} name={name} description={description} type={type} status={status} owner={owner} namespace={namespace}/>
                    </div>,
                    document.querySelector('.container') as HTMLElement // Pega como referencia o .container para poder cobrir todo ele com o modelpverlay
                )
            }
        </>
    );
}
