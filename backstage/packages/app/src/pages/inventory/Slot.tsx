import { useNavigate } from 'react-router-dom';

export type Slot = {
    name?: string,
    image?: string, 
    aspectRatio?: number,
	id?: string,
	namespace?: string,
}

export const SlotInventory: React.FC<Slot> = ({ name, image, aspectRatio, id, namespace}) => {
    const navigate = useNavigate();

    if (!image || !name || !aspectRatio || !id || !namespace) {
        return (
            <div className='slot' />
        );
    } 
		const onCLick = () => {
			if (image && name && aspectRatio) {
				navigate(`/catalog/${namespace}/resource/${id}`);
			}
		};
        return (
            <div
                className='slot'
                style={{ 
                    flexDirection: 'column', 
                    cursor: 'pointer' 
                }}
                role="button"
                tabIndex={0}
                onClick={onCLick}
                onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onCLick();
                    }
                }}
            >
                <img className="item" src={image} alt={`Inventory item: ${name}`} style={{ aspectRatio: `1 / ${aspectRatio}` }} />
                <div className="item-label">{name}</div>
            </div>
        );
    
}