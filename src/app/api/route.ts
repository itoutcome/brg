import { NextRequest, NextResponse } from 'next/server';
import { createUUID } from '@/lib/create_uuid';
import { formSchema } from '@/lib/schemas';
import type { DataItem, ResponseType } from '@/lib/types';



let oameni : DataItem[] = [];

// oameni = [{
// 	id   : createUUID(),
// 	nume : 'Gheorghe',
// 	pret : '500',
// 	moneda : 'EUR'
// }, {
// 	id : createUUID(),
// 	nume : 'Ioana',
// 	pret : '200',
// 	moneda : 'EUR'
// }];




export async function GET()
{
	return NextResponse.json(oameni);
}


// e loc de mai bine la error handling,
// dar e tarziu si e suficient to prove a point
export async function POST(req: NextRequest)
{
	try {
		const body : ResponseType = await req.json();

		const { action, data } = body;

		if (action === 'ADD')
		{
			const parsed_data = formSchema.parse(data);
			
			oameni.push({
				...parsed_data,
				id: createUUID()
			});
			

			return NextResponse.json(
				{ message: 'Data added successfully', data },
				{ status: 201 }
			);
		}

		if (action === 'DELETE')
		{
			const { id } = data;

			oameni = oameni.filter((item) => item.id !== id);

			return NextResponse.json(
				{ message: 'Data removed successfully', data },
				{ status: 201 }
			);
		}
	} 
	catch (error)
	{
		const error_message = error instanceof Error ? error.message : 'An unexpected error occurred';

		return NextResponse.json(
			{ error: error_message },
			{ status: 500 }
		);
	}
}