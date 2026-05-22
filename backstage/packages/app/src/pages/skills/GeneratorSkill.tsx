import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';
import { useEffect } from 'react';
import { Entity } from "@backstage/catalog-model"

import { Skill, ItemSkill } from './ItemSkill';
import { FilteredList } from './PageSkills'
import React from 'react';

import { Generator, MapGenerator } from '../../components/generator/Generator';

export const SkillGenerator = async (catalog: CatalogApi) => {
    
    try{
        const filterSkill:any = ((entity:Entity) => entity.kind === 'Component' && entity.spec?.type === 'skill');
        const filterSystem:any = ((e:Entity) => e.kind === 'System');
        let skills = await Generator(catalog, filterSkill);
        const systems = await MapGenerator(catalog, filterSystem);

        for (const item of skills){
            console.log(item);
            item.system = systems.get(item.system.replace("system:default/",""))?.title || "NO SYSTEM YET";
        }
        return skills as Skill[];
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