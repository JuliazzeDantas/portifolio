import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';
import { useEffect } from 'react';
import { Entity } from "@backstage/catalog-model"

import { ItemQuest } from './ItemQuest';
import React from 'react';
import { Generator } from '../../components/generator/Generator';

export type Quest = {
    name?: string;
    title?: string;
    description?:string;
    status?: 'completed' | 'failed' | 'in-progress';
    system?: string
    namespace?: string;
    owner?: string;
}

const QuestGenerator = async (catalog: CatalogApi) => {

    try{
        const filter: any = (e:Entity) => e.kind === 'Component' && e.spec?.type === 'quest';
        const quests = await Generator(catalog, filter);

        for (const item of quests){
            item.system = String(item.spec?.system || 'project').replace("system:default/","").toUpperCase();
            item.owner = String(item.spec?.owner || 'raizen').replace("group:default/","").replace("user:default/","");
        }
        return quests as Quest[];
    }
    catch(error){
        console.error('Erro ao buscar entidades:', error);
    }
    return [];
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

export const QuestList: React.FC = () => {
    const catalog = useApi(catalogApiRef);
    const [generatedQuests, setQuests] = React.useState<Quest[]>([]);

    useEffect(() => {
        const fetchQuests = async () => {
            const generatedQuests = await QuestGenerator(catalog) || [];
            setQuests(generatedQuests);
        }
        fetchQuests();
    }, [catalog]);

    const sortedQuests = [...generatedQuests].sort(
        (a, b) => getSortPriority(a) - getSortPriority(b)
    );

    return(
        <>
            {
                sortedQuests.map((quest, key) => (
                    <ItemQuest key={key} status={quest.status ?? 'failed'} name={quest.name} title={quest.title} description={quest.description} type={quest.system} owner={quest.owner} namespace={quest.namespace}/>
                ))
            }
        </>
    );
}