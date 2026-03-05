
import React from 'react';

import '../../core/core-styles/core-page.css';
import './styles/inventory.css';

import { RowGenerator } from './InventoryGenerator';
import { DefaultPage } from '../../core/DefaultPage';


export const InventoryPage: React.FC= () => {
	return (
		<DefaultPage titleHeader="Inventory">
			<div className='inventory-container'>
				<RowGenerator />
			</div>
		</DefaultPage>
	);
};