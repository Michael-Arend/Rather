import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const authedUser = useSelector((state) => state.users.authUser);

  const authed = authedUser !== "";

  return authed ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default RequireAuth;
