import { useState } from 'react'

import './styles/window-filter.css'

import { generatorColumn } from './GenerateColumn';
import { GeneratorListCheckBox } from './GeneratorCheckBox'
import { FilteredList } from './types';

type CloseWindowProps<T> = {
    entityList: T[];
    getTags: (item: T) => string[] | undefined;
    getSystem: (item: T) => string | undefined;
    getTitle?: (item: T) => string | undefined;
    getStatus?: (item: T) => string | undefined;
    closeWindow: () => void;
    filteredList: FilteredList;
    setFilteredList:  React.Dispatch<React.SetStateAction<FilteredList>>
}

export function WindowFilter<T>({
    entityList, 
    getTags, 
    getSystem, 
    getTitle, 
    getStatus, 
    closeWindow, 
    filteredList, 
    setFilteredList
}: CloseWindowProps<T>): JSX.Element {
    
    const columnsGenerated = generatorColumn(entityList, getTags, getSystem, getTitle, getStatus);
    const [systemFiltered, setSystemFilter] = useState<string[]>(filteredList.systemList);
    const [tagFiltered, setTagFilter] = useState<string[]>(filteredList.tagList);
    const [titleFiltered, setTitleFilter] = useState<string[]>(filteredList.titleList);
    const [statusFiltered, setStatusFilter] = useState<string[]>(filteredList.statusList);

    const applyFilter = () =>{
        setFilteredList({
            titleList: titleFiltered,
            systemList: systemFiltered,
            tagList: tagFiltered,
            statusList: statusFiltered,
        });
        closeWindow();
    }
    
    return(
        <div className='window-filter'>
            <div className='float-window-header'>
                <h2>Filter</h2> 
                <button onClick={closeWindow} style={{ cursor: 'pointer' }}>X</button>
            </div>
            <div className="window-filter-body">
                {getStatus ? (
                    <div className='column-filter'>
                        <GeneratorListCheckBox column={columnsGenerated.statusList} itemList={statusFiltered} setItemList={setStatusFilter}/>
                    </div>
                ) : (
                    <div className='column-filter'>
                        <GeneratorListCheckBox column={columnsGenerated.titleList} itemList={titleFiltered} setItemList={setTitleFilter}/>
                    </div>
                )}
                <div className='column-filter'>
                    <GeneratorListCheckBox column={columnsGenerated.systemList} itemList={systemFiltered} setItemList={setSystemFilter}/>
                </div>
                <div className='column-filter'>
                    <GeneratorListCheckBox column={columnsGenerated.tagList} itemList={tagFiltered} setItemList={setTagFilter}/>
                </div>
            </div>
            <button className='button-apply' onClick={applyFilter}>Apply</button>
            
        </div>
    )
}

