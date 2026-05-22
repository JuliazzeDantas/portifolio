import { useNavigate } from 'react-router-dom';
export type Slot = {
    name?: string,
    image?: string, 
    aspectRatio?: number,
	id?: string,
	namespace?: string,
}

export const SlotInventory: React.FC<Slot> = ({ name, image, aspectRatio, id, namespace}) => {
    if (!image || !name || !aspectRatio || !id || !namespace) {
        return (
            <div className='slot'>
            </div>
        );
    } else {
		const navigate = useNavigate();
		const onCLick = () => {
			if (image && name && aspectRatio) {
				navigate(`/catalog/${namespace}/resource/${id}`);
			}
		};
        return (
            <div className='slot' style={{ flexDirection: 'column', cursor: 'pointer' }} onClick={onCLick}>
                <img className="item" src={image} alt={`Inventory item: ${name}`} style={{ aspectRatio: `1 / ${aspectRatio}` }} />
                <div className="item-label">{name}</div>
            </div>
        );
    }
}