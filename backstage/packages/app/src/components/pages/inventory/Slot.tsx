import React from 'react';

type Slot = {
    name?: string,
    image?: string, 
    aspectRatio?: number
}

export const SlotInventory: React.FC<Slot> = ({name, image, aspectRatio}) => {
	if (!image || !name || !aspectRatio) {
		return (
			<div className='slot'>
			</div>
		);
	}
	else {
		return (
			<div className='slot' style={{flexDirection:'column'}}>
				<img className="item" src={image} alt={`Inventory item: ${name}`} style={{aspectRatio: `1 / ${aspectRatio}`}} />
				<div className="item-label">{name}</div>
			</div>
		);
	}
}