import { ShowDataTable } from '@/components/ShowDataTable';
import { InsertDataForm } from '@/components/InsertDataForm';



export default function Home()
{
	return (
		<div className="mx-auto max-w-4xl pt-12 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<InsertDataForm />
				<ShowDataTable />
			</main>
		</div>
	);
}