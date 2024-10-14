import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from '@/hooks/use-toast'


const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
})

type ProfileFormValues = z.infer<typeof profileSchema>

// This would typically come from your authentication context
const defaultValues: Partial<ProfileFormValues> = {
  name: "John Doe",
  email: "john.doe@example.com",
}

const UpdateProfileForm = () => {
  const { toast } = useToast()
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  function onSubmit(data: ProfileFormValues) {
    // This is where you would typically make an API call to update the profile
    console.log(data)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
      duration: 2000
    })
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setAvatarSrc(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }
  return (
    <Card className="w-full">
    <CardHeader>
      <CardTitle>Update Profile</CardTitle>
      <CardDescription>Change your profile information here.</CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarSrc || "/placeholder.svg?height=96&width=96"} alt="Profile picture" />
              <AvatarFallback >JD</AvatarFallback>
            </Avatar>
            <Label htmlFor="avatar" className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
              Change avatar
              <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </Label>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CardContent>
    <CardFooter className="flex flex-col items-center space-y-4">
      <Button className="w-[350px]" onClick={form.handleSubmit(onSubmit)}>Update Profile</Button>
    </CardFooter>
  </Card>
  )
}

export default UpdateProfileForm
