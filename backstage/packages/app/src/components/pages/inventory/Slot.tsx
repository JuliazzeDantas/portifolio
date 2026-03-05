import React from 'react';
import { useNavigate } from 'react-router';

type Slot = {
    name?: string,
    image?: string, 
    aspectRatio?: number,
    id?: string,
    namespace?: string
}

export const SlotInventory: React.FC<Slot> = ({name, image, aspectRatio, id, namespace}: Slot) => {
	if (!image || !name || !aspectRatio || !id || !namespace) {
		return (
			<div className='slot'>
			</div>
		);
	}
	else {

		const navigate = useNavigate(); 

		return (
			<div className='slot' style={{flexDirection:'column'}} onClick={() => navigate(`/catalog/${namespace}/resource/${id}`)}>
				<img className="item" src={image} alt={`Inventory item: ${name}`} style={{aspectRatio: `1 / ${aspectRatio}`}} />
				<div className="item-label">{name}</div>
			</div>
		);
	}
}