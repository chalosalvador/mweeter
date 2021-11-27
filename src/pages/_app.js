import "styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "hooks/useAuth";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
