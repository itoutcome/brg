'use client';

import { useState } from 'react';
import { useDataStore } from '@/lib/useDataStore';
import { useRemoveFromStore } from '@/lib/useDataStore';
import type { ItemIdType } from '@/lib/types';


import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { DeleteConfirmationDialog } from '@/components/deleteConfirmationDialog';
import { money_formater } from '@/lib/money_formatter';


export function ShowDataTable()
{
	const mutation = useRemoveFromStore();

	const { data, error, isLoading, isError } = useDataStore();


	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<null | ItemIdType['id']>(null);

	function handleDelete(id : ItemIdType['id'])
	{
		setSelectedId(id);
		setDialogOpen(true);
	}
	
	function confirmDelete()
	{
		if (selectedId !== null)
		{
			mutation.mutate(selectedId);
		}
		setDialogOpen(false);
		setSelectedId(null);
	}

	

	if (isLoading) return <p>Loading...</p>;

	if (isError) return <p>Error: {(error as Error).message}</p>;


	if (data?.length === 0)
	{
		return <></>;
	}


	return (
		<>
			<Table>
				<TableCaption>O lista cu nume, pret, moneda si buton de stergere</TableCaption>
				<TableHeader>
					<TableRow>
					<TableHead>Id</TableHead>
					<TableHead className='w-1/2'>Nume</TableHead>
					<TableHead>Pret</TableHead>
					<TableHead className="text-right">Actiuni</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((post, key) => {

						const { id, nume, pret, moneda } = post;

						const formated_money_value = money_formater('ro-ro', moneda, parseInt(pret));

						return (
							<TableRow key={key}>
								<TableCell>{`${id.substring(0, 13)}...`}</TableCell>
								<TableCell className="w_40_percent font-medium">{nume}</TableCell>
								<TableCell className="whitespace-nowrap">{formated_money_value} {moneda}</TableCell>
								<TableCell className="text-right">
									<button
										onClick={() => handleDelete(id)}
										className="cursor-pointer opacity-80 hover:opacity-50 mr-[8px] p-[5px]"
									>
										<DeleteIconSVG />
									</button>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

			<DeleteConfirmationDialog
				isOpen={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onConfirm={confirmDelete}
			/>
		</>
	);
}


function DeleteIconSVG()
{
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M3 6h18"/>
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
			<line x1="10" x2="10" y1="11" y2="17"/>
			<line x1="14" x2="14" y1="11" y2="17"/>
		</svg>
	);
}