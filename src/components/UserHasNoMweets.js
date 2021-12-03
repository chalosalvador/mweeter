import React from "react";
import UnfollowButton from "components/UnfollowButton";
import FollowButton from "components/FollowButton";
import { useUserFollows } from "hooks/useUserFollows";
import Loading from "components/Loading";
import { useAuth } from "hooks/useAuth";
import PropTypes from "prop-types";

const UserHasNoMweets = ({ displayName }) => {
  const { displayNames } = useUserFollows();
  const { user } = useAuth();

  const getContent = () => {
    return displayNames.includes(displayName) ? (
      <div className="mt-10">
        <UnfollowButton userToUnfollow={displayName} className="py-2 px-10" />
      </div>
    ) : (
      <>
        <div>You can follow this user to get his/her Mweets in your feed.</div>
        <div className="mt-10">
          <FollowButton userToFollow={displayName} className="py-2 px-10" />
        </div>
      </>
    );
  };

  if (user.displayName === displayName) {
    return (
      <>
        <div className="flex flex-col text-gray-400 text-center items-center">
          You have not sent any Mweet yet. Start sending your first Mweet.
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col text-gray-400 text-center items-center">
      {displayNames ? (
        <>
          <div>@{displayName} has not sent any Mweet yet.</div>
          <div className="flex flex-col items-center">{getContent()}</div>
        </>
      ) : (
        <div className="w-20">
          <Loading />
        </div>
      )}
    </div>
  );
};

UserHasNoMweets.propTypes = {
  displayName: PropTypes.string,
};

export default UserHasNoMweets;
