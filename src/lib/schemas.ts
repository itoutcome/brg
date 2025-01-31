import { z } from 'zod';
import { makeValues } from '@/lib/type_helpers';
import { monezi } from '@/lib/monezi';



// Convert the values into a Zod union
export const MoneziSchema = z.union(makeValues(monezi));



export const formSchema = z.object({
	nume: z.string().min(3, {
		message: 'Numele trebuie sa contina cel putin 3 caractere',
	}),
	
	pret: z.string()
		.min(1, { message: 'Va rugam introduceti un pret' })
		.transform((value) => {
			// Allow empty input at first
			if (!value) return undefined;

			const dots_removed      = value.replace(/[.]/g, '');
			const digits_w_decimals = dots_removed.replace(/[^0-9]/g, '');

			if (digits_w_decimals !== dots_removed)
			{
				return undefined;
			}

			return parseInt(digits_w_decimals);
		})
		.refine((value) => value !== undefined, {
			message: "Pret invalid (ex: 1.234,56)",
		})
		.refine((value) => value !== undefined && value >= 0, {
			message: "Pretul trebuie sa fie pozitiv",
		})
		.transform((value) => {
			// Ensure you return a string value after the transformation
			return value !== undefined ? value.toString() : "";
		}),

	moneda: MoneziSchema
})
