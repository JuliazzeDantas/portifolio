
import React from 'react';

import './styles/inventory.css';

import { DefaultPage } from '../../components/core/DefaultPage';
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