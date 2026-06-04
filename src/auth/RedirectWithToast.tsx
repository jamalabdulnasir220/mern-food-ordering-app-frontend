import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  to: string;
  message: string;
};

const RedirectWithToast = ({ to, message }: Props) => {
  const location = useLocation();

  useEffect(() => {
    toast.error(message);
  }, [message]);

  return <Navigate to={to} replace state={location.state} />;
};

export default RedirectWithToast;
