import React from 'react'

import './styles/window-filter.css'

import { generatorColumn } from './GenerateColumn';
import { GeneratorListCheckBox } from './GeneratorCheckBox'
import { FilteredList } from './PageSkills';

type CloseWindowProps = {
    CloseWindow: () => void;
    filteredList: FilteredList;
    setFilteredList:  React.Dispatch<React.SetStateAction<FilteredList>>
}

export const WindowFilter: React.FC<CloseWindowProps> = ({CloseWindow, filteredList, setFilteredList}) => {
    
    const columnsGenerated = generatorColumn();

    const [titleFilter, setTitleFilter] = React.useState<string[]>(filteredList.titleList);
    const [systemFilter, setSystemFilter] = React.useState<string[]>(filteredList.systemList);
    const [tagFilter, setTagFilter] = React.useState<string[]>(filteredList.tagList);

    const applyFilter = () =>{
        setFilteredList({
            titleList: titleFilter,
            systemList: systemFilter,
            tagList: tagFilter
        });
        CloseWindow();
    }
    
    return(
        <div className='window-filter'>
            <div className='float-window-header'>
                <h2>Filter</h2> 
                <button onClick={CloseWindow} style={{ cursor: 'pointer' }}>X</button>
            </div>
            <div className="window-filter-body">
                <div className='column-filter'>
                    <GeneratorListCheckBox column={columnsGenerated.skillTitleList} itemList={titleFilter} setItemList={setTitleFilter}/>
                </div>
                <div className='column-filter'>
                    <GeneratorListCheckBox column={columnsGenerated.systemList} itemList={systemFilter} setItemList={setSystemFilter}/>
                </div>
                <div className='column-filter'>
                    <GeneratorListCheckBox column={columnsGenerated.tagList} itemList={tagFilter} setItemList={setTagFilter}/>
                </div>
            </div>
            <button className='button-apply' onClick={applyFilter}>Apply</button>
            
        </div>
    )
}

