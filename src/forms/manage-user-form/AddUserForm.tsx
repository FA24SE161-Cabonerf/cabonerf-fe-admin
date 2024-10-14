import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AddUserFormProps {
  onSubmit: (user: Omit<User, "id">) => void
}
const AddUserForm = ({ onSubmit }: AddUserFormProps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, role })
    setName("")
    setEmail("")
    setRole("")
  }
return(
  <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <Label htmlFor="add-name">Name</Label>
    <Input id="add-name" value={name} onChange={(e) => setName(e.target.value)} required />
  </div>
  <div>
    <Label htmlFor="add-email">Email</Label>
    <Input id="add-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
  </div>
  <div>
    <Label htmlFor="add-role">Role</Label>
    <Input id="add-role" value={role} onChange={(e) => setRole(e.target.value)} required />
  </div>
  <Button type="submit">Add User</Button>
</form>
)
}

export default AddUserForm;