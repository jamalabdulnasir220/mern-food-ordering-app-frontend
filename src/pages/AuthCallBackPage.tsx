import { useCreateMYUser } from "@/api/authRouter";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMYUser();

  const isUserCreated = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !isUserCreated.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      isUserCreated.current = true;
    }
    navigate("/");
  }, [user, createUser, navigate]);

  return <div>Loading....</div>;
};

export default AuthCallBackPage;
