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
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { X, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface EditDialogueProps {
  children: React.ReactNode
  onUserAdded?: () => void;
}

const Adddialouge = ({ children, onUserAdded }: EditDialogueProps) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [job, setJob] = useState('')
  const [salary, setSalary] = useState('')

  const resetForm = () => {
    setName('')
    setEmail('')
    setAge('')
    setJob('')
    setSalary('')
  }

  const handleSave = async () => {
    if (!name || !email || !age || !job || !salary) {
      toast.error('Please fill in all fields')
      return
    }

    const newUser = {
      name,
      email,
      age: parseInt(age),
      job,
      salary: parseFloat(salary),
    }

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add user')
      }

      if (onUserAdded) {
        onUserAdded()
      }

      toast.success('User added successfully')
      setOpen(false)
      resetForm()

    } catch (error) {
      console.error('Error adding user:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to add user')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add user information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter user name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="job" className="text-right">
              Job
            </Label>
            <Input
              id="job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              placeholder="Enter job title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">
              Salary
            </Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter salary amount"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-end mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              setOpen(false)
              resetForm()
            }}
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Adddialouge
