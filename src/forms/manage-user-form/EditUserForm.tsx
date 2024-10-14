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

interface EditUserFormProps {
  user: User
  onSubmit: (user: User) => void
}

const EditUserForm = ({ user, onSubmit }: EditUserFormProps) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState(user.role)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ id: user.id, name, email, role })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="edit-name">Name</Label>
        <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="edit-email">Email</Label>
        <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="edit-role">Role</Label>
        <Input id="edit-role" value={role} onChange={(e) => setRole(e.target.value)} required />
      </div>
      <Button type="submit">Update User</Button>
    </form>
  )
}

export default EditUserForm