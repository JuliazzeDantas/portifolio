import React from "react";

import {DefaultPage} from '../../components/core/DefaultPage';
import { SkillList } from './GeneratorSkill';
import { FilterButton } from './FilterButton';

import './styles/skill-head.css'

export type FilteredList = {
    tagList:string[];
    systemList:string[];
    titleList:string[];
}

export const SkillPage: React.FC = () => {

    const [filteredList, setFilteredList] = React.useState<FilteredList>({
        tagList: [],
        systemList: [],
        titleList: [],
    })

    return (
        <DefaultPage titleHeader="Skills">
            <FilterButton filteredList={filteredList} setFilteredList={setFilteredList}/>
            <div className="skill-head">
                <div className="column-skill-head skill-head-name"><p>Skills</p></div>
                <div className="column-skill-head skill-head-system"><p>System</p></div>
                <div className="column-skill-head skill-head-description"><p>Description</p></div>
                <div className="column-skill-head skill-head-tag"><p>Tags</p></div>
            </div>
            <div className="skill-container">
                <SkillList {...filteredList} />
            </div>
        </DefaultPage>
    );
}