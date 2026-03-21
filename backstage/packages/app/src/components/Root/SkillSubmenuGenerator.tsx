import { CatalogApi } from "@backstage/plugin-catalog-react";

export type  SkillSubmenu = {
    name: string;
    to: string;
}

export const SkillSubmenuGenerator = async (catalog: CatalogApi) => {
    let skillSubmenu: SkillSubmenu[] = [];
    let name: string;
    let to: string;

    try{
        const entities = await catalog.getEntities();
        const items = entities.items.filter((e: any) => e.kind === 'System' && e.spec.type === 'skill');

        items.forEach((item:any) => {
            name = item.metadata.title;
            to = `/catalog/default/system/${item.metadata.name}`;
            skillSubmenu.push({name, to});
        })
        console.log('Submenu de habilidades gerado:', skillSubmenu);
        return skillSubmenu;
    }
    catch(error){
        console.error('Erro ao buscar entidades:', error);
    }
    return [];
}