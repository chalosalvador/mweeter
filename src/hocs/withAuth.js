import { useRouter } from "next/router";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "hooks/useAuth";
import { Routes } from "constants/routes";
import Loading from "components/Loading";

const getPageToRedirect = (shouldRedirectToProfile, renderOnlyWhenAuthed) => {
  if (shouldRedirectToProfile) {
    return Routes.PROFILE;
  } else if (renderOnlyWhenAuthed) {
    return Routes.SIGNIN;
  } else {
    return Routes.HOME;
  }
};

const withAuth =
  ({ renderOnlyWhenAuthed }) =>
  (ChildComponent) => {
    const WithAuthHOC = () => {
      const { user, isLoadingUser } = useAuth();
      const hasAuth = !!user;
      const router = useRouter();
      const hasCompletedProfile = user?.username;
      const shouldRedirectToProfile =
        user !== false &&
        !hasCompletedProfile &&
        router.pathname !== Routes.PROFILE;
      const shouldRenderPage = renderOnlyWhenAuthed === hasAuth;
      const willRedirect = !shouldRenderPage || shouldRedirectToProfile;
      const showLoading = isLoadingUser || willRedirect;

      useEffect(() => {
        if (isLoadingUser) return; // Do nothing while loading
        if (willRedirect) {
          const pageToRedirect = getPageToRedirect(
            shouldRedirectToProfile,
            renderOnlyWhenAuthed
          );
          router.replace(pageToRedirect);
        }
      }, [
        hasAuth,
        isLoadingUser,
        router,
        shouldRedirectToProfile,
        willRedirect,
      ]);

      if (showLoading) {
        return (
          <div className="absolute w-24 h-24 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Loading />
          </div>
        );
      }

      return <ChildComponent />;
    };

    WithAuthHOC.displayName = "WithAuthHOC";
    return WithAuthHOC;
  };

withAuth.propTypes = {
  ChildComponent: PropTypes.any,
};

export default withAuth;
