import Button from "components/Button";
import { useAuth } from "hooks/useAuth";
import { User } from "services/users";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

const UnfollowButton = ({ userToUnfollow }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const unfollowUser = async () => {
    setLoading(true);
    await User.removeFollow(user.displayName, userToUnfollow).catch((e) => {
      console.error("The was an error :(, please try again.", e);
      toast.error("The was an error :( please try again.", {
        toastId: "error_follow",
      });
      setLoading(false);
    });
  };

  return (
    <Button
      className="border border-gray-300 rounded-full px-3 text-sm"
      onClick={unfollowUser}
      disabled={loading}
      loading={loading}
    >
      Unfollow
    </Button>
  );
};

UnfollowButton.propTypes = {
  userToUnfollow: PropTypes.string,
};

export default UnfollowButton;
