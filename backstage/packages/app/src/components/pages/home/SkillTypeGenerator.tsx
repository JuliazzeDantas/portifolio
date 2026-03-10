import React, { useState, useEffect} from "react";
import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';

import { Skill } from "./Skill";


const Generator = async (catalog: CatalogApi) => {
    
    const entities = await catalog.getEntities();
	const items = entities.items.filter((e: any) => e.kind === 'System' && e.spec.type === 'skill');
	console.log('Entidades do tipo System:', items);   

    return items.map(item => {
        return <Skill name={item.metadata.name} namespace={item.metadata.namespace || 'default'} description={item.metadata.description || 'No description'} />
    })
}

export const SkillTypeGenerator: React.FC = () => {
    const catalog = useApi(catalogApiRef);
    const [skillTypes, setSkillTypes] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const fetchSkillTypes = async () => {
            const skillTypes = await Generator(catalog)
            setSkillTypes(skillTypes);
        }
        fetchSkillTypes();
    }, [catalog]);
    
    return(<>
        {...skillTypes}
     </>)
}