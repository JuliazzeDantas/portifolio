import { useNavigate } from 'react-router-dom';

import './styles/medium-panel.css';
import './styles/skill-box.css';

export type SkillType = {
    name: string
    title: string
    namespace: string
    description: string
}

export const Skill: React.FC<SkillType> = ({name, title, namespace, description}: SkillType) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/catalog/${namespace}/system/${name}`);
    }

    return (
        <div
            className="skill-space"
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onClick();
                }
            }}
        >
            <h1>{title}</h1>
            <div className="skill-space-body">
                <p>{description}</p>
            </div>
        </div>

    )
}