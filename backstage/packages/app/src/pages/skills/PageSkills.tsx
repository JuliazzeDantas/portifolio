import React from "react";
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';

import { DefaultPage } from '../../components/core/DefaultPage';
import { FilterButton } from '../../components/filter/FilterButton';
import { FilteredList } from '../../components/filter/types';

import { SkillGenerator, SkillList } from './GeneratorSkill';
import { Skill } from './ItemSkill';

import './styles/skill-head.css'

export const SkillPage: React.FC = () => {

    const catalog = useApi(catalogApiRef);
    const [skills, setSkills] = React.useState<Skill[]>([]);
    const [filteredList, setFilteredList] = React.useState<FilteredList>({
        tagList: [],
        systemList: [],
        titleList: [],
    })

    React.useEffect(() => {
        const fetchSkills = async () => {
            const generatedSkills = await SkillGenerator(catalog) || [];
            setSkills(generatedSkills);
        }
        fetchSkills();
    }, [catalog]);

    return (
        <DefaultPage titleHeader="Skills">
            <FilterButton
                entityList={skills}
                getTags={skill => skill.tags}
                getSystem={skill => skill.system}
                getTitle={skill => skill.title}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
            />
            <div className="skill-head">
                <div className="column-skill-head skill-head-name"><p>Skills</p></div>
                <div className="column-skill-head skill-head-system"><p>System</p></div>
                <div className="column-skill-head skill-head-description"><p>Description</p></div>
                <div className="column-skill-head skill-head-tag"><p>Tags</p></div>
            </div>
            <div className="skill-container">
                <SkillList skills={skills} filteredList={filteredList} />
            </div>
        </DefaultPage>
    );
}
