import PropTypes from "prop-types";
import UserInfo from "components/UserInfo";
import FollowButton from "components/FollowButton";

const RecommendedItem = ({ user }) => {
  return (
    <div className="flex justify-between items-center py-5 border-t border-gray-200">
      <UserInfo user={user} />

      <FollowButton userToFollow={user.displayName} />
    </div>
  );
};

RecommendedItem.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default RecommendedItem;
