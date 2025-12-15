import { useGetMyUser, useUpdateMyUser } from "@/api/authRouter";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isPending: isGettingUser } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();

  if (isGettingUser) {
    return <div>Loading....</div>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>
  }


  return <UserProfileForm currentUser={currentUser} onsave={updateUser} isLoading={isPending} />;
};

export default UserProfilePage;
