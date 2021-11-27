import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

const LogoutButton = ({ className }) => {
  const { logout, user } = useAuth();
  return (
    user && (
      <button onClick={logout} className={className}>
        Logout
      </button>
    )
  );
};

LogoutButton.propTypes = {
  className: PropTypes.string,
};

export default LogoutButton;
