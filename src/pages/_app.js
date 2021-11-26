import "styles/globals.css";
import PropTypes from "prop-types";
import { AuthProvider } from "hooks/useAuth";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
