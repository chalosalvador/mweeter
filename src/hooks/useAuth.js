import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  getRedirectResult,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "services";
import { User } from "services/users";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={useAuthProvider()}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleUser = (userData) => {
    if (userData) {
      // active session
      setUser(userData);

      return userData;
    } else {
      // no session
      setUser(false);
      return false;
    }
  };

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      handleUser(false);
      throw error;
    }
  }

  async function logout() {
    await auth.signOut();
    handleUser(false);
  }

  const verifyIfNewUserAndSave = async () => {
    try {
      const result = await getRedirectResult(auth);

      if (result) {
        const { isNewUser } = getAdditionalUserInfo(result);

        if (isNewUser) {
          const { email, photoURL, uid, displayName } = result.user;
          const fullName = displayName.split(" ", 2);
          try {
            await User.save(uid, {
              email,
              photoURL,
              uid,
              displayName,
              firstName: fullName[0] || null,
              lastName: fullName[1] || null,
              username: null,
            });
          } catch (e) {
            console.error("Error adding user to db: ", e);
          }
        }
      }
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorMessage", errorCode, errorMessage);
    }
  };

  useEffect(() => {
    const onUserDataChange = (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        handleUser(userData);
      } else {
        // User not in db, sign out
        console.log("User not in db, sign out");
        handleUser(false);
      }
    };

    let unsubscribeUserData;
    const unsubscribeAuthState = onAuthStateChanged(
      auth,
      async (userAuthData) => {
        if (userAuthData) {
          await verifyIfNewUserAndSave();

          unsubscribeUserData = User.subscribe(
            userAuthData.uid,
            onUserDataChange
          );
        } else {
          // User is signed out
          handleUser(false);
        }
      }
    );

    return () => {
      unsubscribeAuthState();
      if (unsubscribeUserData) {
        unsubscribeUserData();
      }
    };
  }, [router]);

  return {
    isLoadingUser: user === null,
    user,
    signInWithGoogle,
    logout,
  };
}
