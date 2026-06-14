import { useNavigate } from 'react-router-dom';

import { ListCard } from '../../components/table/ListCard';

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
        <ListCard
            title={title}
            system={system}
            third={description}
            tags={tags}
            onClick={onClickSkill}
        />
    );
}
