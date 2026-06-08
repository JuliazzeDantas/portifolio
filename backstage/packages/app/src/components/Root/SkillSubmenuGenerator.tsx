import { CatalogApi } from "@backstage/plugin-catalog-react";

import { Generator } from "../generator/Generator";

export type  SkillSubmenu = {
    system: string;
    to: string;
}

export const SkillSubmenuGenerator = async (catalog: CatalogApi) => {
    let skillSubmenu: SkillSubmenu[] = [];

    try{
       
        const filter:any = ((e: any) => e.kind === 'Component' && e.spec?.type === 'skill');
        const items: any[] = await Generator(catalog, filter);

        const systems: string[] = [...new Set(
            items.map((item: any) => String(item.system || 'default'))
        )].sort((a, b) => a.localeCompare(b))


        systems.forEach(
            (system: string) => {
                const name = system.toLowerCase().split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                skillSubmenu.push({
                    system: name, 
                    to: `/catalog?filters%5Bkind%5D=component&filters%5Btype%5D=skill&filters%5Bsystem%5D=${system}&filters%5Buser%5D=all`})
            }
        );
        return skillSubmenu;
    }
    catch(error){
        console.error('Erro ao buscar entidades:', error);
    }
    return [];
}