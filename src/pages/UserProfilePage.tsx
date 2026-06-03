import { useGetMyUser, useUpdateMyUser } from "@/api/authRouter";
import UserProfileForm, {
  type UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { currentUser, isPending: isGettingUser } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo as string | undefined;

  if (isGettingUser) {
    return <div>Loading....</div>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  const handleSave = async (data: UserFormData) => {
    const updated = await updateUser(data);

    if (
      returnTo &&
      returnTo !== "/auth-callback" &&
      returnTo !== "/user-profile"
    ) {
      navigate(returnTo, { replace: true });
      return;
    }

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
