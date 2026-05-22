import { createPortal } from 'react-dom';
import React from 'react';
import './styles/filter-button.css';

import Filter from './image/filter.png';
import { WindowFilter } from './WindowFilter'
import { FilteredList } from './PageSkills';

type FilterProps = {
    filteredList: FilteredList;
    setFilteredList:  React.Dispatch<React.SetStateAction<FilteredList>>
}

export const FilterButton: React.FC<FilterProps> = ({filteredList, setFilteredList}) => {

    const [openWindowStatus, setWindowStatus] = React.useState(false);

    const closeFloatWindow = () => setWindowStatus(false);
    const openFloatWindow = () => setWindowStatus(true);
    
    return(
        <div>
            <button className="filter-button" onClick={openFloatWindow}><p>Filter</p>
                <img className='filter-image' src={Filter} alt='Filter'/>
            </button> 
            {
                openWindowStatus && createPortal(
                    <div className='modal-overlay'>
                        <WindowFilter CloseWindow={closeFloatWindow} filteredList={filteredList} setFilteredList={setFilteredList}/>
                    </div>,
                    document.querySelector('.container') as HTMLElement
                )
            }

        </div>
    )
}