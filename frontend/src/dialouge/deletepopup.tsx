import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { X, Check } from "lucide-react"

interface DeletePopupProps {
  children: React.ReactNode
}

const DeletePopup = ({ children }: DeletePopupProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 justify-end mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeletePopup
