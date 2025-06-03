import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Loader2, Trash2, Plus, Pencil } from "lucide-react"
import DeletePopup from "../dialouge/deletepopup"
import Editdialouge from "../dialouge/Editdialouge"
import Adddialouge from "../dialouge/adddialouge"

interface User {
  _id: string
  name: string
  email: string
  age: number
  job: string
  salary: number
}

const TableData = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchUsers()
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={handleRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Users Table</h1>
        <Adddialouge onUserAdded={fetchUsers}>
          <Button 
            variant="ghost"
            size="icon"
            className="hover:bg-green-100 hover:text-green-600"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </Adddialouge>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">Name</TableHead>
              <TableHead className="w-[25%]">Email</TableHead>
              <TableHead className="w-[10%] hidden sm:table-cell">Age</TableHead>
              <TableHead className="w-[20%] hidden md:table-cell">Job</TableHead>
              <TableHead className="w-[15%] hidden lg:table-cell">Salary</TableHead>
              <TableHead className="w-[10%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{user.email}</TableCell>
                  <TableCell className="hidden sm:table-cell">{user.age}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.job}</TableCell>
                  <TableCell className="hidden lg:table-cell">${user.salary.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Editdialouge 
                        userData={user}
                        onUserUpdated={fetchUsers}
                      >
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="hover:bg-blue-100 hover:text-blue-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Editdialouge>
                      <DeletePopup
                        userId={user._id}
                        onUserDeleted={fetchUsers}
                      >
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeletePopup>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TableData
