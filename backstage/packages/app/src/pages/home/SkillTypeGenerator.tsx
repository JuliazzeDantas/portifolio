import { useState, useEffect} from "react";
import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';

import { Skill } from "./Skill";


const magicPlaceGenerator = async (catalog: CatalogApi) => {
    const entities = await catalog.getEntities();
	const items = entities.items.filter((e: any) => e.kind === 'System' && e.spec?.type === 'skill');  

    return items.map(item => {
        return <Skill key={item.metadata.name} name={item.metadata.name} title={item.metadata.title || item.metadata.name} namespace={item.metadata.namespace || 'default'} description={item.metadata.description || 'No description'} />
    })
}

const rowGenerator = (skills: JSX.Element[]) => {
    const rows = [];
    for(let i = 0; i < skills.length; i += 2){
        rows.push(
            <div className="skill-space-row" key={i}>
                {skills[i]}
                {skills[i + 1] ? skills[i + 1] : null}
            </div>
        )
    }
    return rows;
}

export const SkillTypeGenerator: React.FC = () => {
    const catalog = useApi(catalogApiRef);
    const [skillTypes, setSkillTypes] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const fetchSkillTypes = async () => {
            const generatedSkillTypes = await magicPlaceGenerator(catalog)
            setSkillTypes(generatedSkillTypes);
        }
        fetchSkillTypes();
    }, [catalog]);
    
    return(<>
        {rowGenerator(skillTypes)}
     </>)
}