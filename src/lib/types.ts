import { UUID } from 'crypto';
import { monezi } from '@/lib/monezi';


type MoneziType = keyof typeof monezi;

type DataItem = {
	id : UUID,
	nume : string,
	pret : string,
	moneda : MoneziType
}

type DataItemAddType = Omit<DataItem, 'id'>;
type ItemIdType = Pick<DataItem, 'id'>;


type ResponseType = {
	action : 'ADD',
	data : DataItemAddType
} | {
	action : 'DELETE',
	data : ItemIdType
};


export type {
	DataItem,
	DataItemAddType,
	ItemIdType,
	ResponseType
}