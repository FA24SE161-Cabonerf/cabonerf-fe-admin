import { useState } from "react"
import UpdateProfileForm from "@/forms/update-profile-form/UpdateProfileForm"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth/AuthContext"
import { useCurrentUser, useUpdateProfile, useUpdateUserAvatar } from "@/api/manageUserProfile"

const UpdateProfilePage = () => {
  const { currentUser } = useAuth();
  const updateProfileMutation = useUpdateProfile()
  const updateAvatarMutation = useUpdateUserAvatar()
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

  const handleAvatarUpload = async (file: File): Promise<string> => {
    try {
      await updateAvatarMutation.mutateAsync({ image: file, userId: userData.id });
      toast({
        title: "Success",
        description: "Avatar uploaded successfully",
        variant: "default",
      });
      const updatedUser = await refetchUser();
      if (updatedUser.data?.profilePictureUrl) {
        return updatedUser.data.profilePictureUrl;
      } else {
        throw new Error("Failed to get updated profile picture URL");
      }
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      let errorMessage = "Failed to upload avatar. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <UpdateProfileForm 
        currentUser={userData}
        onSubmit={handleUpdateProfile}
        onAvatarUpload={handleAvatarUpload}
        isSubmitting={updateProfileMutation.isPending || updateAvatarMutation.isPending}
        error={error}
        refetchUser={refetchUser}
      />
    </div>
  )
}

export default UpdateProfilePage

