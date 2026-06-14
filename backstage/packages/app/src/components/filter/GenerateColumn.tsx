import { FilteredList } from './types';

export function generatorColumn<T>(
    entityList: T[],
    getTags: (item: T) => string[] | undefined,
    getSystem: (item: T) => string | undefined,
    getTitle?: (item: T) => string | undefined,
    getStatus?: (item: T) => string | undefined,
): FilteredList {

    const tagList: string[] = [... new Set(entityList.flatMap(
        item => getTags(item) ?? []
    ))].filter(Boolean).sort((a, b) => a.localeCompare(b));

    const systemList: string[] = [... new Set(entityList.flatMap(
        item => { const system = getSystem(item); return system?.trim() ? [system] : []; }
    ))].sort((a, b) => a.localeCompare(b));

    const titleList: string[] = getTitle ? [... new Set(entityList.flatMap(
        item => { const title = getTitle(item); return title?.trim() ? [title] : []; }
    ))].sort((a, b) => a.localeCompare(b)) : [];

    const statusList: string[] = getStatus ? [... new Set(entityList.flatMap(
        item => { const status = getStatus(item); return status?.trim() ? [status] : []; }
    ))].sort((a, b) => a.localeCompare(b)) : [];

    return {tagList, systemList, titleList, statusList}
}
