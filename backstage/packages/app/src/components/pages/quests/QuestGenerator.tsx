import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';
import { useEffect } from 'react';

import { ItemQuest } from './ItemQuest';
import React from 'react';

export type Quest = {
    name?: string;
    title?: string;
    description?:string;
    status?: 'completed' | 'failed' | 'in-progress';
    type?: string
    namespace?: string;
    owner?: string;
}

const QuestGenerator = async (catalog: CatalogApi) => {
    let questList: Quest[] = [];
    try{
        const entities = await catalog.getEntities();
        const quests = entities.items.filter((e:any) => e.kind === 'Component' && e.spec?.type === 'quest');

        for (const item of quests){
            console.log('Processando item:', item);
            const name = item.metadata.name || "No name";
            const title = item.metadata.title || "No name provided";
            const description = item.metadata.description || "No description provided";
            const status = String(item.spec?.lifecycle || 'in-progress') as Quest['status'];
            const type = String(item.spec?.system || 'project').replace("system:default/","").toUpperCase();
            const namespace = item.metadata.namespace || 'platform-engineering';
            const owner = String(item.spec?.owner || 'raizen').replace("group:default/","").replace("user:default/","");
            questList.push({name, title, description, status, type, namespace, owner});
        }
        console.log('Quests geradas:', questList);
        return questList;
    }
    catch(error){
        console.error('Erro ao buscar entidades:', error);
    }
    return [];
}

const getSortPriority = (quest: Quest): number => {
    if (quest.status === 'in-progress' && quest.type === 'ROLE') return 0;
    if (quest.status === 'in-progress' && quest.type === 'PROJECT') return 1;
    if (quest.status === 'in-progress') return 2;
    if (quest.status === 'completed' && quest.type === 'TUTORIAL') return 3;
    if (quest.status === 'completed' && quest.type === 'ROLE') return 4;
    if (quest.status === 'completed' && quest.type === 'PROJECT') return 5;
    if (quest.status === 'completed') return 6;
    if (quest.status === 'failed') return 7;
    return 8;
};

// Gerar uma função que pega a lista do tipo Quests[] e transforma em JSX.Element
// Ideias:
// Agrupar por System, namespace ou owner
// Por System é mais fácil (poucos tipos)
// Por Domain é mais categorizável (pega o domínio de habilidades específicas)
// Por Owner tem um story telling melhor
// Dropdown menu por agrupamento?

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
                    <ItemQuest key={key} status={quest.status ?? 'failed'} name={quest.name} title={quest.title} description={quest.description} type={quest.type} owner={quest.owner} namespace={quest.namespace}/>
                ))
            }
        </>
    );
}