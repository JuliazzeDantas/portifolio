import { createPortal } from 'react-dom';
import { useState } from 'react';
import './styles/filter-button.css';

import Filter from './image/filter.png';
import { WindowFilter } from './WindowFilter'
import { FilteredList } from './types'

type FilterProps<T> = {
    entityList: T[];
    getTags: (item: T) => string[] | undefined;
    getSystem: (item: T) => string | undefined;
    getTitle: (item: T) => string | undefined;
    filteredList: FilteredList;
    setFilteredList:  React.Dispatch<React.SetStateAction<FilteredList>>
}

export function FilterButton<T>({
    entityList, 
    getTags, 
    getSystem, 
    getTitle, 
    filteredList, 
    setFilteredList
}: FilterProps<T>): JSX.Element  {

    const [openWindowStatus, setWindowStatus] = useState(false);

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
                        <WindowFilter
                            entityList={entityList}
                            getTags={getTags}
                            getSystem={getSystem}
                            getTitle={getTitle}
                            closeWindow={closeFloatWindow}
                            filteredList={filteredList}
                            setFilteredList={setFilteredList}
                        />
                    </div>,
                    document.querySelector('.container') as HTMLElement
                )
            }

        </div>
    )
}