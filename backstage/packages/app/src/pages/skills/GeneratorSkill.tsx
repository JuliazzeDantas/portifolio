import { CatalogApi } from '@backstage/plugin-catalog-react';
import { Entity } from "@backstage/catalog-model"

import { Skill, ItemSkill } from './ItemSkill';
import { FilteredList } from '../../components/filter/types';

import { generator, mapGenerator } from '../../components/generator/Generator';

export const skillGenerator = async (catalog: CatalogApi) => {
    
    try{
        const filterSkill:any = ((entity:Entity) => entity.kind === 'Component' && entity.spec?.type === 'skill');
        const filterSystem:any = ((e:Entity) => e.kind === 'System');
        const skills = await generator(catalog, filterSkill);
        const systems = await mapGenerator(catalog, filterSystem);

        for (const item of skills){
            item.system = systems.get(item.system.replace("system:default/",""))?.title || "NO SYSTEM YET";
        }
        return skills as Skill[];
    }
    catch {
        return [];
    }
}

type SkillListProps = {
    skills: Skill[];
    filteredList: FilteredList;
}

export const SkillList: React.FC<SkillListProps> = ({ skills, filteredList }) => {
    const noFilter = filteredList.tagList.length === 0 &&
                    filteredList.systemList.length === 0 &&
                    filteredList.titleList.length === 0;

    const filteredSkills = noFilter ? skills : skills.filter(
        item => {
            return item.tags?.some(tag => filteredList.tagList.includes(tag)) || filteredList.systemList.includes(item.system ?? "") || filteredList.titleList.includes(item.title ?? "")
        }
    );

    return(
        <>
            {
                filteredSkills.map((skill, key) => (
                    <ItemSkill key={key} name={skill.name} title={skill.title} description={skill.description} system={skill.system} namespace={skill.namespace} tags={skill.tags} />
                ))
            }
        </>
    );
}