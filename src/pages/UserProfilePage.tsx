import { useGetMyUser, useUpdateMyUser } from "@/api/authRouter";
import UserProfileForm, {
  type UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { currentUser, isPending: isGettingUser } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();
  const navigate = useNavigate();

  if (isGettingUser) {
    return <div>Loading....</div>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  const handleSave = async (data: UserFormData) => {
    const updated = await updateUser(data);

    // After saving profile, navigate based on role
    if (updated?.role === "restaurant_manager") {
      navigate("/manager-dashboard");
    } else if (updated?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <UserProfileForm
      currentUser={currentUser}
      onsave={handleSave}
      isLoading={isPending}
    />
  );
};

export default UserProfilePage;
