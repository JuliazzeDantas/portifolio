import { CatalogApi } from '@backstage/plugin-catalog-react';
import { Entity } from "@backstage/catalog-model"

import { ItemQuest } from './ItemQuest';
import { generator } from '../../components/generator/Generator';
import { FilteredList } from '../../components/filter/types';

export type Quest = {
    name?: string;
    title?: string;
    description?:string;
    status?: 'completed' | 'failed' | 'in-progress';
    system?: string
    namespace?: string;
    owner?: string;
    tags?: string[];
}

export const questGenerator = async (catalog: CatalogApi) => {

    try{
        const filter: any = (e:Entity) => e.kind === 'Component' && e.spec?.type === 'quest';
        const quests = await generator(catalog, filter);

        for (const item of quests){
            item.system = String(item.system || 'project').replace("system:default/","").toUpperCase();
            item.owner = String(item.spec?.owner || 'raizen').replace("group:default/","").replace("user:default/","");
        }
        return quests as Quest[];
    }
    catch {
        return [];
    }
}

const getSortPriority = (quest: Quest): number => {
    if (quest.status === 'in-progress' && quest.system === 'ROLE') return 0;
    if (quest.status === 'in-progress' && quest.system === 'PROJECT') return 1;
    if (quest.status === 'in-progress') return 2;
    if (quest.status === 'completed' && quest.system === 'TUTORIAL') return 3;
    if (quest.status === 'completed' && quest.system === 'ROLE') return 4;
    if (quest.status === 'completed' && quest.system === 'PROJECT') return 5;
    if (quest.status === 'completed') return 6;
    if (quest.status === 'failed') return 7;
    return 8;
};

type QuestListProps = {
    quests: Quest[];
    filteredList: FilteredList;
}

export const QuestList: React.FC<QuestListProps> = ({ quests, filteredList }) => {
    const noFilter = filteredList.tagList.length === 0 &&
                    filteredList.systemList.length === 0 &&
                    filteredList.statusList.length === 0;

    const filteredQuests = noFilter ? quests : quests.filter(
        item => {
            return item.tags?.some(tag => filteredList.tagList.includes(tag)) || filteredList.systemList.includes(item.system ?? "") || filteredList.statusList.includes(item.status ?? "")
        }
    );

    const sortedQuests = [...filteredQuests].sort(
        (a, b) => getSortPriority(a) - getSortPriority(b)
    );

    return(
        <>
            {
                sortedQuests.map((quest, key) => (
                    <ItemQuest key={key} status={quest.status ?? 'failed'} name={quest.name} title={quest.title} description={quest.description} type={quest.system} owner={quest.owner} namespace={quest.namespace} tags={quest.tags}/>
                ))
            }
        </>
    );
}
