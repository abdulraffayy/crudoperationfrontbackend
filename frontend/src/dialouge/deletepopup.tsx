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
import { useState } from "react"
import { toast } from "sonner"

interface DeletePopupProps {
  children: React.ReactNode
  userId: string | number
  onUserDeleted?: () => void
}

const DeletePopup = ({ children, userId, onUserDeleted }: DeletePopupProps) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!userId) {
      setError('Invalid user ID')
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete user')
      }

      if (onUserDeleted) {
        onUserDeleted()
      }

      setOpen(false)
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete user')
      toast.error('Failed to delete user')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
        <DialogFooter className="flex gap-2 justify-end mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeletePopup
