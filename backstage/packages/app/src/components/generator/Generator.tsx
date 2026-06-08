import { CatalogApi } from "@backstage/plugin-catalog-react";

type Entity = { 
    title: string; 
    name: string; 
    description: string; 
    system: any; 
    namespace: string; 
    owner: string; 
    tags: string[]; 
    status: any;
};

export const generator = async (
    catalog: CatalogApi,
    filter: any, // Formato: => ((e:any) => e.kind === 'Component' && e.spec?.type === 'skill')
) => {

    const itemList:any = [];
    const entities = await catalog.getEntities();
    const usableEntities = entities.items.filter(filter);
    
    for (const item of usableEntities){
        const name = item.metadata.name || "No name";
        const title = item.metadata.title || "No name provided";
        const system = String(item.spec?.system || "No System").replace("system:default/","");
        const status = item.spec?.lifecycle || "failed";
        const description = item.metadata.description || "No description provided";
        const namespace = item.metadata.namespace || 'No namespace';
        const owner = String(item.spec?.owner || 'No owner').replace("group:default/","").replace("user:default/","");
        const tags = item.metadata.tags || [];
        itemList.push({name, title, description, system, namespace, owner, tags, status});
    }
    return itemList;
}

export const mapGenerator = async (
    catalog: CatalogApi,
    filter: any, // Formato: => ((e:any) => e.kind === 'Component' && e.spec?.type === 'skill')
) => {

    
    const itemMap = new Map<string, Entity>();
    const usableEntities = await generator(catalog, filter);
    
    for (const item of usableEntities){
        itemMap.set(item.name, item);
    }
    return itemMap;
}