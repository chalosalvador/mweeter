import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "hooks/useAuth";
import { User } from "services/users";

const UserFollowsContext = createContext(null);

export function UserFollowsProvider({ children }) {
  const { user } = useAuth();
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    const unsubscribe = User.subscribeFollows(
      user.displayName,
      async (snapshot) => {
        const displayNames = [user.displayName];
        const usersData = {};
        usersData[user.displayName] = {
          firstName: user.firstName,
          lastName: user.lastName,
          photoURL: user.photoURL,
          displayName: user.displayName,
        };

        snapshot.forEach((doc) => {
          displayNames.push(doc.id);
        });

        const usersSnap = await User.getSome(displayNames);
        usersSnap.forEach((userDoc) => {
          const { firstName, lastName, photoURL, displayName } = userDoc.data();
          usersData[userDoc.id] = {
            firstName,
            lastName,
            photoURL,
            displayName,
          };
        });

        setFollows({
          displayNames,
          usersData,
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.displayName, user.firstName, user.lastName, user.photoURL]);

  return (
    <UserFollowsContext.Provider value={follows}>
      {children}
    </UserFollowsContext.Provider>
  );
}

UserFollowsProvider.propTypes = {
  children: PropTypes.any,
};

export const useUserFollows = () => {
  const context = useContext(UserFollowsContext);

  if (context === undefined) {
    throw new Error(
      "useUserFollows must be used within an UserFollowsProvider"
    );
  }
  return context;
};
