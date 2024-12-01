import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query'
import { User } from '@/types/user'

const MAX_LENGTH = 255

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(MAX_LENGTH, { message: `Name must not exceed ${MAX_LENGTH} characters.` }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }).max(MAX_LENGTH, { message: `Phone number must not exceed ${MAX_LENGTH} characters.` }).nullable(),
  bio: z.string().max(MAX_LENGTH, { message: `Bio must not exceed ${MAX_LENGTH} characters.` }).nullable(),
  profilePictureUrl: z.string().url().or(z.literal('')),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface UpdateProfileFormProps {
  currentUser: User;
  onSubmit: (data: ProfileFormValues) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  refetchUser: (options?: RefetchOptions) => Promise<QueryObserverResult<User, Error>>;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ currentUser, onSubmit, isSubmitting, error, refetchUser }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(currentUser.profilePictureUrl)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: currentUser.fullName,
      phone: currentUser.phone || "",
      bio: currentUser.bio || "",
      profilePictureUrl: currentUser.profilePictureUrl || "",
    },
  })

  useEffect(() => {
    form.reset({
      fullName: currentUser.fullName,
      phone: currentUser.phone || "",
      bio: currentUser.bio || "",
      profilePictureUrl: currentUser.profilePictureUrl || "",
    })
    setAvatarPreview(currentUser.profilePictureUrl || "")
  }, [currentUser, form])

  const handleSubmit = async (data: ProfileFormValues) => {
    await onSubmit(data)
    refetchUser()
  }

  const handleAvatarUrlChange = (url: string) => {
    setAvatarPreview(url);
    form.setValue('profilePictureUrl', url);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Change your profile information here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreview || "/placeholder.svg?height=96&width=96"} alt="Profile picture" />
                <AvatarFallback>{currentUser.fullName.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="profilePictureUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture URL</FormLabel>
                    <FormControl>
                      <Input 
                        type="url" 
                        placeholder="https://example.com/your-image.jpg" 
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          field.onChange(e);
                          handleAvatarUrlChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} maxLength={MAX_LENGTH} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} value={field.value || ''} maxLength={MAX_LENGTH} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself" {...field} value={field.value || ''} maxLength={MAX_LENGTH} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      {error && (
        <Alert variant="destructive" className="mb-4 mx-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <CardFooter className="flex flex-col items-center space-y-4">
        <Button 
          className="w-[350px]" 
          onClick={form.handleSubmit(handleSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UpdateProfileForm

