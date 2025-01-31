import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';


type DialogTypes = {
	isOpen: boolean,
	onClose: () => void
	onConfirm: () => void
}

export function DeleteConfirmationDialog({ isOpen, onClose, onConfirm } : DialogTypes)
{
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Confirm Delete</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Sunteti sigur ca doriti sa stergeti?
				</DialogDescription>
				<DialogFooter>
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}