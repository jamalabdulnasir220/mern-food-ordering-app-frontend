import { useGetMyUser, useUpdateMyUser } from "@/api/authRouter";
import UserProfileForm, {
  type UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import PageLoader from "@/components/ui/page-loader";
import { resolvePostAuthPath } from "@/lib/postAuthNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

const UserProfilePage = () => {
  const { currentUser, isPending: isGettingUser } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo as string | undefined;

  if (isGettingUser) {
    return <PageLoader label="Loading your profile..." />;
  }

  if (!currentUser) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border bg-card p-8 text-center sm:p-12">
        <UserCircle className="mb-4 h-14 w-14 text-brand" aria-hidden />
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Unable to load profile
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Please try refreshing the page or signing in again.
        </p>
      </div>
    );
  }

  const handleSave = async (data: UserFormData) => {
    const updated = await updateUser(data);

    navigate(resolvePostAuthPath(updated.role, returnTo), { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl pb-8">
      <UserProfileForm
        currentUser={currentUser}
        onsave={handleSave}
        isLoading={isPending}
        title="Your profile"
      />
    </div>
  );
};

export default UserProfilePage;
