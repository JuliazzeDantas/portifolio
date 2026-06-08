import './styles/window-filter.css';

type ItemCheckBoxProps = {
    inputName: string;
    checked: boolean;
    onToggle: (checked: boolean) => void;
}

export const ItemCheckBox: React.FC<ItemCheckBoxProps> = ({inputName, checked, onToggle}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(event.target.checked)
    }

    return (
        <label className='item-filter'>
            <input 
                key={inputName}
                type='checkbox'
                checked={checked}
                onChange={handleChange}
            />
            <span>{inputName}</span>
        </label>
    );
};

type GeneratorListCheckBoxProps = {
    column: string[];
    itemList: string[];
    setItemList:  React.Dispatch<React.SetStateAction<string[]>>
}

export const GeneratorListCheckBox: React.FC<GeneratorListCheckBoxProps> = ({column, itemList, setItemList}) => {

    const handleToggle = (item: string, checked: boolean) => {
        setItemList(
            oldList => {
                if (checked) {
                    return oldList.includes(item) ? oldList : [...oldList, item]
                }
                return oldList.filter(element => element !== item )
            }
        )
    }

    return (
        <>
            {
                column.map( item => (
                       <ItemCheckBox 
                            key={item}
                            inputName={item}
                            checked={itemList.includes(item)}
                            onToggle={(checked) => handleToggle(item, checked)}
                        />
                                    
                ))
            }
        </>
    )
}