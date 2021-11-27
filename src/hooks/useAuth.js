import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "services";
import { User } from "services/users";
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
  children: PropTypes.any,
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

  useEffect(() => {
    let unsubscribeUserData;
    const unsubscribeAuthState = onAuthStateChanged(
      auth,
      async (userAuthData) => {
        const onUserDataChange = (doc) => {
          const getUserDataFromAuth = () => {
            const { email, photoURL, uid, displayName } = userAuthData;
            const fullName = displayName.split(" ", 2);

            return {
              email,
              photoURL,
              uid,
              firstName: fullName[0],
              lastName: fullName[1],
            };
          };

          let userFound = false;
          if (doc.exists()) {
            const userData = doc.data();
            userFound = userData.uid === userAuthData.uid;
            if (userFound) {
              handleUser(userData);
            }
          }

          if (!userFound) {
            handleUser(getUserDataFromAuth());
            unsubscribeUserData();
          }
        };

        if (userAuthData) {
          unsubscribeUserData = User.subscribe(
            userAuthData.displayName,
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
  }, []);

  return {
    isLoadingUser: user === null,
    user,
    signInWithGoogle,
    logout,
  };
}
