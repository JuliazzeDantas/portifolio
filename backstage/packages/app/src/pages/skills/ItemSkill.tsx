import { useNavigate } from 'react-router-dom';

import './styles/skill-head.css';
import './styles/skill-body.css';

export type Skill = {
    name?: string;
    title?: string;
    description?:string;
    system?: string
    namespace?: string;
    owner?: string;
    tags?: string[];
}

export const ItemSkill: React.FC<Skill> = ({name, namespace, title, description, system, tags}) => { 

    const navigate = useNavigate();

    const onClickSkill = () => {
        navigate(`/catalog/${namespace}/component/${name}`);
    }

    return (
        <div>
            <button className='card-skill' onClick={onClickSkill} key={name}>
                <p className='card-skill-name'>{title}</p>
                <p className='card-skill-system'>{system}</p>
                <p className='card-skill-description'>{description}</p>
                <div className='card-skill-tags'>
                    {tags?.map((tag) => <span className='card-skill-tag' key={tag}>{tag}</span>)}
                </div>
            </button>
        </div>
    );
}