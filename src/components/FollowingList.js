import React from "react";
import { useUserFollows } from "hooks/useUserFollows";
import UserInfoSkeleton from "components/UserInfoSkeleton";
import UserInfo from "components/UserInfo";
import { useAuth } from "hooks/useAuth";
import UnfollowButton from "components/UnfollowButton";
import RecommendationsList from "components/RecommendationsList";

const FollowingList = () => {
  const { displayNames, usersData } = useUserFollows();
  const { user } = useAuth();

  if (!displayNames) {
    return new Array(5).fill(true).map((_, i) => <UserInfoSkeleton key={i} />);
  }

  if (displayNames.length === 1) {
    // only following itself
    return (
      <>
        <div className="text-gray-400 mt-5">You are not following anybody.</div>
        <div className="text-gray-400 mb-5">Start making some friends :)</div>
        <RecommendationsList />
      </>
    );
  }

  return (
    <div className="mt-5 flex w-full flex-wrap">
      {displayNames.map(
        (userFollowedDisplayName) =>
          userFollowedDisplayName !== user.displayName && (
            <div
              key={userFollowedDisplayName}
              className="flex justify-between items-center py-5 w-80 border-t border-gray-200 mr-10 last:mr-0"
            >
              <UserInfo user={usersData[userFollowedDisplayName]} />
              <UnfollowButton userToUnfollow={userFollowedDisplayName} />
            </div>
          )
      )}
    </div>
  );
};

export default FollowingList;
