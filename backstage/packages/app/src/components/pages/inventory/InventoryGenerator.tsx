import { useEffect, useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { CatalogApi, catalogApiRef } from '@backstage/plugin-catalog-react';

import { SlotInventory } from './Slot';

import scroll from './images/scroll.png';
import book from './images/book.png';
import rock from './images/rock.png';

type SlotItem = {
	name?: string;
	image?: string;
	aspectRatio?: number;
	description?: string;
	id?: string;
	namespace?: string;
}

const  ItemGenerator = async (catalog: CatalogApi) => {
	let slotItems: SlotItem[] = [];
	try {
		const entities = await catalog.getEntities();
		const items = entities.items.filter((e: any) => e.kind === 'Resource' && e.spec?.type === 'inventory');
		console.log('Entidades do tipo Resource e type=inventory:', items);
		for (const item of items) {
			console.log('Processando item:', item);
			const name = item.metadata.title;
			const id = item.metadata.name;
			const namespace = item.metadata.namespace || 'default';
			const description = item.metadata.description || '';
			let image = '';
			let aspectRatio = 1;
			if (item.metadata.tags?.includes('degree')) {
				image = scroll;
				aspectRatio = 0.75;
			}
			else if (item.metadata.tags?.includes('course')) {
				image = book;
				aspectRatio = 0.6;
			}
            else{
                image = rock;
				aspectRatio = 0.6;
            }
			slotItems.push({ name, image, aspectRatio, description, id, namespace });
		}
	} catch (error) {
		console.error('Erro ao buscar entidades:', error);
	}
	return slotItems;
}
const SlotGenerator = async (slotItems: SlotItem[]): Promise<JSX.Element[]> => {
	const length = slotItems.length;
	if (length < 9) {
		for (let quantity = length; quantity < 12; quantity++) {
			slotItems.push({});
		}
	}
	else if (length > 9) {
		for (let quantity = length; quantity % 4; quantity++) {
			slotItems.push({});
		}
	}
	return slotItems.map((item) => (
		<SlotInventory name={item.name} image={item.image} aspectRatio={item.aspectRatio} id={item.id} namespace={item.namespace} />
	));
}

const chunkSlots = (arr: JSX.Element[], size: number) => {
	const result = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
};

export const RowGenerator: React.FC = () => {
	const catalog = useApi(catalogApiRef);
	const [slots, setSlots] = useState<JSX.Element[]>([]);

	useEffect(() => { 
		const fetchData = async () => {
			const item = await ItemGenerator(catalog);
			const slot = await SlotGenerator(item);
			setSlots(slot);
			
		};
		fetchData();
	}, [catalog]);

	const slotRows = chunkSlots(slots, 4);

	return (
		<>
			{slotRows.map((row, idx) => (
				<div className='row' style={{ display: 'flex', flexDirection: 'row' }} key={idx}>
					{row}
				</div>
			))}
		</>
	);
};