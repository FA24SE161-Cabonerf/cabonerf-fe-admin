import { useState } from "react"
import UpdateProfileForm from "@/forms/update-profile-form/UpdateProfileForm"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth/AuthContext"
import { useCurrentUser, useUpdateProfile } from "@/api/manageUserProfile"

const UpdateProfilePage = () => {
  const { currentUser } = useAuth();
  const updateProfileMutation = useUpdateProfile()
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const { data: userData, refetch: refetchUser, isLoading, isError } = useCurrentUser(currentUser?.id);

  if (!currentUser) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>User not logged in</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !userData) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch user data. Please try again.</AlertDescription>
      </Alert>
    )
  }

  const handleUpdateProfile = async (data: {
    fullName: string;
    phone: string | null;
    bio: string | null;
    profilePictureUrl: string | null;
  }) => {
    try {
      await updateProfileMutation.mutateAsync({
        data,
        userId: userData.id,
      })
      setError(null)
      toast({
        title: "Success",
        description: "Profile updated successfully",
        variant: "default",
      })
      refetchUser()
    } catch (error) {
      console.error("Failed to update profile:", error)
      let errorMessage = "Failed to update profile. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
      }
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <UpdateProfileForm 
        currentUser={userData}
        onSubmit={handleUpdateProfile}
        isSubmitting={updateProfileMutation.isPending}
        error={error}
        refetchUser={refetchUser}
      />
    </div>
  )
}

export default UpdateProfilePage

