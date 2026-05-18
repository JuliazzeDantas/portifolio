import { CatalogApi } from "@backstage/plugin-catalog-react";

export type  SkillSubmenu = {
    namespace: string;
    to: string;
}

export const SkillSubmenuGenerator = async (catalog: CatalogApi) => {
    let skillSubmenu: SkillSubmenu[] = [];

    try{
        const entities = await catalog.getEntities();
        const items = entities.items.filter((e: any) => e.kind === 'Component' && e.spec.type === 'skill');

        const namespaces = [...new Set(
            items.map(item => item.metadata.namespace || 'default')
        )].sort((a,b) => a.localeCompare(b))


        namespaces.forEach(
            (namespace: any) => {
                const name = namespace.toLowerCase().split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                skillSubmenu.push({
                    namespace: name, 
                    to: `/catalog?filters%5Bkind%5D=component&filters%5Btype%5D=skill&filters%5Bnamespace%5D=${namespace}&filters%5Buser%5D=all`})
            }
        );
        return skillSubmenu;
    }
    catch(error){
        console.error('Erro ao buscar entidades:', error);
    }
    return [];
}