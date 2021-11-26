import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const { logout, user } = useAuth();
  return user && <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
