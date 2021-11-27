import PropTypes from "prop-types";
import Sidebar from "components/Sidebar";
import { useAuth } from "hooks/useAuth";

const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center">
      {user && <Sidebar />}

      <div className="py-10 px-14 w-full">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
