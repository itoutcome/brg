import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseType } from '@/lib/types';
import type { DataItem, DataItemAddType, ItemIdType } from '@/lib/types';
import type { formSchemaType } from '@/components/InsertDataForm';



async function fetchPosts(): Promise<DataItem[]> {
	const response = await fetch('/api');
	return response.json();
};


async function postDataToStore(newData: DataItemAddType)
{
	const obj : ResponseType = {
		action: 'ADD',
		data : newData
	};
	
	const response = await fetch('/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(obj)
	});
  

	if (!response.ok) {
		throw new Error('Failed to post data');
	}

	const parsed = await response.json();

	if (parsed.error)
	{
		throw new Error(parsed.error)
	}
}


async function removeItemFromStore(id : ItemIdType['id'])
{
	const obj : ResponseType = {
		action: 'DELETE',
		data : {
			id
		}
	};

	const response = await fetch('/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(obj)
	});
  
	if (!response.ok) {
		throw new Error('Failed to post data');
	}

	const parsed = await response.json();

	if (parsed.error)
	{
		throw new Error(parsed.error)
	}
}




export function useDataStore()
{
	return useQuery<DataItem[], Error>({
		queryKey: ['posts'],
		queryFn: fetchPosts
	});
}


export function useRemoveFromStore()
{
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeItemFromStore,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ['posts']
			});
		}
	})
}


export function useAddDataToStore({ reset } : { reset : (values?: formSchemaType, options?: Record<string, boolean>) => void })
{
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postDataToStore,
		onSuccess: (_, variables: formSchemaType) => {

			// reset() to reset everything
			// get the previous value for select to keep moneda
			reset({
				nume: '',
				pret: '',
				moneda: variables.moneda
			});

			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ['posts']
			});
		},
		onError: (error) => {
			console.error('Error creating user:', error.message);
			// Sau pus in ui, scos din mutation
			// si trimis la ceva sistem de monitorizare gen Sentry, Bugsnag, PostHog / whatever
		},
	})
}