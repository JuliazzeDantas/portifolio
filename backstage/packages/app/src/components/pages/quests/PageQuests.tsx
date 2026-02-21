import React from "react";

import {DefaultPage} from '../../core/DefaultPage';
import {ListQuest} from './ItemQuest';

export const QuestPage: React.FC = () => {
    return (
        <DefaultPage titleHeader="Quests">
            <div className="quest-container">
                <ListQuest status="completed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
                <ListQuest status="failed" title="Product Owner" description="Descrição Product Owner" type="Role"/>
            </div>
        </DefaultPage>
    );
}