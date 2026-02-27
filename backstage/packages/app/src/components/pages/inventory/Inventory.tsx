
import React from 'react';

import '../../core/core-styles/core-page.css';
import './styles/inventory.css';

import { DefaultPage } from '../../core/DefaultPage';
import { RowGenerator } from './InventoryGenerator';


export const InventoryPage: React.FC = () => {
	return (
		<DefaultPage titleHeader="Inventory">
			<div className='inventory-container'>
				<RowGenerator />
			</div>
		</DefaultPage>
	);
};