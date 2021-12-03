import Button from "components/Button";
import { useAuth } from "hooks/useAuth";
import { User } from "services/users";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

const FollowButton = ({ userToFollow, className }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const followUser = async () => {
    setLoading(true);
    await User.addFollow(user.displayName, userToFollow).catch((e) => {
      console.error("The was an error :(, please try again.", e);
      toast.error("The was an error :( please try again.", {
        toastId: "error_follow",
      });
      setLoading(false);
    });
  };

  return (
    <Button
      className={`border border-gray-300 rounded-full px-3 text-sm ${className}`}
      onClick={followUser}
      disabled={loading}
      loading={loading}
    >
      Follow
    </Button>
  );
};

FollowButton.propTypes = {
  userToFollow: PropTypes.string,
  className: PropTypes.string,
};

export default FollowButton;
