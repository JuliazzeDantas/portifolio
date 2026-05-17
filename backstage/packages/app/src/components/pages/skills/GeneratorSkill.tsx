import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';
import { useEffect } from 'react';

import { Skill, ItemSkill } from './ItemSkill';
import { FilteredList } from './PageSkills'
import React from 'react';


export const SkillGenerator = async (catalog: CatalogApi) => {
    let skillList: Skill[] = [];
    try{
        const entities = await catalog.getEntities();
        const skills = entities.items.filter((e:any) => e.kind === 'Component' && e.spec?.type === 'skill');

        for (const item of skills){
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
        return skillList;
    }
    catch(error){
        console.error('Erro ao buscar entidades:', error);
    }
    return [];
}

export const SkillList: React.FC<FilteredList> = (filteredList: FilteredList) => {
    const catalog = useApi(catalogApiRef);
    const [skillList, setSkillList] = React.useState<Skill[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const generatedSkills = await SkillGenerator(catalog) || [];

            const noFilter = filteredList.tagList.length === 0 &&
                            filteredList.systemList.length === 0 &&
                            filteredList.titleList.length === 0;

                            
            const filteredGeneratedSkills =  noFilter ? generatedSkills : generatedSkills.filter(
                item => {
                    return item.tags?.some(tag => filteredList.tagList.includes(tag)) || filteredList.systemList.includes(item.system ?? "") || filteredList.titleList.includes(item.title ?? "")
                }
            )

            setSkillList(filteredGeneratedSkills);
        }
        fetchSkills();
    }, [filteredList]);

    return(
        <>
            {
                skillList.map((skill, key) => (
                    <ItemSkill key={key} name={skill.name} title={skill.title} description={skill.description} system={skill.system} namespace={skill.namespace} tags={skill.tags} />
                ))
            }
        </>
    );
} 