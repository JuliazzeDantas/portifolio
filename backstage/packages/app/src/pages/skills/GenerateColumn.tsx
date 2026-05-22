import {useApi} from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { useEffect } from 'react'; 

import React from 'react';

import { Skill } from './ItemSkill';
import { SkillGenerator } from './GeneratorSkill';

export const generatorColumn = () => {

    const catalog = useApi(catalogApiRef);
    const [skillList, setSkillList] = React.useState<Skill[]>([])

    useEffect(
        () => {
            SkillGenerator(catalog).then(listOfSkill => setSkillList(listOfSkill || []))
        }, []
    );

    let tagList:string[] = [];
    let systemList :string[] = [];
    let skillTitleList:string[] = [];
    
    for(const skill of skillList){
        tagList.push(...skill.tags ?? []);
        if(skill.system?.trim()){
            systemList.push(skill.system);
        }
        if(skill.title?.trim()){
            skillTitleList.push(skill.title);
        }
    }

    tagList = [...new Set(tagList)].sort(
        (a,b) => a.localeCompare(b)
    );

    systemList = [...new Set(systemList)].sort(
        (a,b) => a.localeCompare(b)
    );

    skillTitleList = [...new Set(skillTitleList)].sort(
        (a,b) => a.localeCompare(b)
    )

    return {tagList, systemList, skillTitleList}
}
