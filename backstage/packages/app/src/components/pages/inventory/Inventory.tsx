
import React from 'react';

import '../../core/core-styles/core-page.css';
import './styles/inventory.css';

import scroll from './images/scroll.png';
import book from './images/book.png';

import {SlotInventory} from './Slot';
import { DefaultPage } from '../../core/DefaultPage';

export const InventoryPage: React.FC= () => {
	return (
		<DefaultPage titleHeader="Inventory">
			<div className='inventory-container'>
				<div className='row' style={{ display: 'flex', flexDirection: 'row' }}>
					<SlotInventory name="Scroll" image={scroll} aspectRatio={0.75} />
					<SlotInventory name="Book" image={book} aspectRatio={0.6} />
					<SlotInventory name="Scroll" image={scroll} aspectRatio={0.75} />
					<SlotInventory />
						
				</div>
				<div className='row' style={{ display: 'flex', flexDirection: 'row' }}>
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
				</div>
				<div className='row' style={{ display: 'flex', flexDirection: 'row' }}>
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
				</div>
				<div className='row' style={{ display: 'flex', flexDirection: 'row' }}>
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
				</div>
				<div className='row' style={{ display: 'flex', flexDirection: 'row' }}>
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
				</div>
				<div className='row' style={{ display: 'flex', flexDirection: 'row' }}>
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
				</div>
				<div className='row' style={{ display: 'flex', flexDirection: 'row' }}>
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
					<SlotInventory />
				</div>
			</div>
		</DefaultPage>
	);
};