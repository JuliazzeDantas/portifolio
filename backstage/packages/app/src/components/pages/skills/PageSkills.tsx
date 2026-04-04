import React from "react";

import {DefaultPage} from '../../core/DefaultPage';
import { SkillList } from "./GeneratorSkill";

export const SkillPage: React.FC = () => {
    return (
        <DefaultPage titleHeader="Skills">
            <div className="skill-container">
                <div className="skill-head"><p>Skills</p><p>System</p><p>Tags</p></div>
                <SkillList />
            </div>
        </DefaultPage>
    );
}