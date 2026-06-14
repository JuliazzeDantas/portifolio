import { useState, useEffect } from "react";
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';

import { DefaultPage } from '../../components/core/DefaultPage';
import { FilterButton } from '../../components/filter/FilterButton';
import { FilteredList } from '../../components/filter/types';
import { TableHeader } from '../../components/table/TableHeader';

import { questGenerator, QuestList, Quest } from "./QuestGenerator";

import './styles/quest.css';

export const QuestPage: React.FC = () => {

    const catalog = useApi(catalogApiRef);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [filteredList, setFilteredList] = useState<FilteredList>({
        tagList: [],
        systemList: [],
        titleList: [],
        statusList: [],
    })

    useEffect(() => {
        const fetchQuests = async () => {
            const generatedQuests = await questGenerator(catalog) || [];
            setQuests(generatedQuests);
        }
        fetchQuests();
    }, [catalog]);

    return (
        <DefaultPage titleHeader="Quests">
            <FilterButton
                entityList={quests}
                getTags={quest => quest.tags}
                getSystem={quest => quest.system}
                getStatus={quest => quest.status}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
            />
            <TableHeader labels={{ name: 'Quest', system: 'Type', third: 'Status', tags: 'Tags' }} />
            <div className="quest-container">
                <QuestList quests={quests} filteredList={filteredList} />
            </div>
        </DefaultPage>
    );
}
