import PropTypes from "prop-types";
import LogoutButton from "./LogoutButton";
import UserInfo from "./UserInfo";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <UserInfo />
        <LogoutButton />
      </div>

      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
