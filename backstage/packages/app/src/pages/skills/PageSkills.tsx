import { useState, useEffect } from "react";
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';

import { DefaultPage } from '../../components/core/DefaultPage';
import { FilterButton } from '../../components/filter/FilterButton';
import { FilteredList } from '../../components/filter/types';

import { TableHeader } from '../../components/table/TableHeader';

import { skillGenerator, SkillList } from './GeneratorSkill';
import { Skill } from './ItemSkill';

export const SkillPage: React.FC = () => {

    const catalog = useApi(catalogApiRef);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [filteredList, setFilteredList] = useState<FilteredList>({
        tagList: [],
        systemList: [],
        titleList: [],
        statusList: [],
    })

    useEffect(() => {
        const fetchSkills = async () => {
            const generatedSkills = await skillGenerator(catalog) || [];
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
            <TableHeader labels={{ name: 'Skills', system: 'System', third: 'Description', tags: 'Tags' }} />
            <div className="skill-container">
                <SkillList skills={skills} filteredList={filteredList} />
            </div>
        </DefaultPage>
    );
}
