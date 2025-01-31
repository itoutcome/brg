'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAddDataToStore } from '@/lib/useDataStore';
import { monezi } from '@/lib/monezi';
import { money_formater } from '@/lib/money_formatter';
import { formSchema } from '@/lib/schemas';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
 
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';





export type formSchemaType = z.infer<typeof formSchema>;

export function ProfileForm()
{
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		reValidateMode: 'onSubmit',
		defaultValues: {
			nume: '',
			pret: '',
			moneda: 'RON'
		},
	})

	const { reset } = form;


	const mutation = useAddDataToStore({ reset });

	function onSubmit(values: z.infer<typeof formSchema>)
	{
		const { nume, pret, moneda } = values;

		mutation.mutate({ 
			moneda,
			nume,
			pret
		});
	}



	function handlePriceChange(e : React.ChangeEvent<HTMLInputElement >, field_onChange : (value: string) => void)
	{
		const input = e.target;
		const value = input.value;

		const cursor_position = input.selectionStart ?? 0;

		if (value === '')
		{
			return field_onChange('');
		}

		const dots_removed      = value.replace(/[.]/g, '');
		const digits_w_decimals = dots_removed.replace(/[^0-9]/g, '');

		if (digits_w_decimals !== dots_removed)
		{
			return field_onChange(value);
		}

		const formated = money_formater('ro-ro', 'EUR', parseInt(digits_w_decimals));


		const added_dots = formated.length - value.length;
    	const new_cursor_position = cursor_position + added_dots;


		field_onChange(formated);

		requestAnimationFrame(() => {
			input.setSelectionRange(new_cursor_position, new_cursor_position);
		});
	}



	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-6 w-full">
				<FormField control={form.control} name="nume"	
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Nume</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Introduceti un nume
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField control={form.control} name="pret"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Pret</FormLabel>
							<FormControl>
								<Input type="text" {...field} onChange={(e) => handlePriceChange(e, field.onChange)} />
							</FormControl>
							<FormDescription>
								Introduceti pretul
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField control={form.control} name="moneda"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Moneda</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl className="w-full">
										<SelectTrigger className="w-full">
											<SelectValue className="w-full" placeholder="Select a verified email to display" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="w-full">
										<SelectGroup className="w-full">
											<SelectLabel>Monezi</SelectLabel>
											{Object.entries(monezi).map(([key, value]) => {
												return (
													<SelectItem key={key} value={key}>{value}</SelectItem>
												);
											})}
										</SelectGroup>
									</SelectContent>
								</Select>
							<FormDescription className="w-full">
								Alegeti moneda dorita
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="mt-[32px]">Adauga</Button>
			</form>
		</Form>
	)
}


export function InsertDataForm()
{
	return (
		<div className="flex flex-row gap-8 row-start-2 items-center sm:items-start w-full">
			<ProfileForm />
		</div>
	);
}