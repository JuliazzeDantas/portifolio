import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';
import { useEffect } from 'react';

import { ItemSkill } from './ItemSkill';
import React from 'react';

export type Skill = {
    name?: string;
    title?: string;
    description?:string;
    system?: string
    namespace?: string;
    owner?: string;
    tags?: string[];
}

const SkillGenerator = async (catalog: CatalogApi) => {
    let skillList: Skill[] = [];
    try{
        const entities = await catalog.getEntities();
        const skills = entities.items.filter((e:any) => e.kind === 'Component' && e.spec?.type === 'skill');

        for (const item of skills){
            console.log('Processando item:', item);
            const name = item.metadata.name || "No name";
            const title = item.metadata.title || "No name provided";
            const description = item.metadata.description || "No description provided";
            const systemTitle = entities.items.filter((e:any) => e.kind === 'System' && e.metadata.name === String(item.spec?.system || 'project').replace("system:default/",""));
            const system = String(systemTitle[0]?.metadata?.title || 'No system title').replace("system:default/","");
            const namespace = item.metadata.namespace || 'platform-engineering';
            const owner = String(item.spec?.owner || 'raizen').replace("group:default/","").replace("user:default/","");
            const tags = item.metadata.tags || [];
            skillList.push({name, title, description, system, namespace, owner, tags});
        }
        console.log('Skills geradas:', skillList);
        return skillList;
    }
    catch(error){
        console.error('Erro ao buscar entidades:', error);
    }
    return [];
}

// Gerar uma função que pega a lista do tipo Skills[] e transforma em JSX.Element
// Ideias:
// Agrupar por System, namespace ou owner
// Por System é mais fácil (poucos tipos)
// Por Domain é mais categorizável (pega o domínio de habilidades específicas)
// Por Owner tem um story telling melhor
// Dropdown menu por agrupamento?

export const SkillList: React.FC = () => {
    const catalog = useApi(catalogApiRef);
    const [generatedSkills, setSkills] = React.useState<Skill[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const generatedSkills = await SkillGenerator(catalog) || [];
            setSkills(generatedSkills);
        }
        fetchSkills();
    }, [catalog]);


    return(
        <>
            {
                generatedSkills.map((skill, key) => (
                    <ItemSkill key={key} name={skill.name} title={skill.title} description={skill.description} system={skill.system} namespace={skill.namespace} tags={skill.tags} />
                ))
            }
        </>
    );
}