export function money_formater(locale : string, currency : string, number : number)
{
	return new Intl.NumberFormat(locale, { 
		style: 'currency', 
		currency, 
		currencyDisplay: 'code',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})
	.format(number)
	.replace(currency, '')
	.trim();
}