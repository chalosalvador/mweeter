import Image from "next/image";
import PropTypes from "prop-types";

const UserInfo = ({ user }) => {
  return (
    user && (
      <div className="flex cursor-default">
        <div className="mr-3 flex-shrink-0">
          <Image
            src={user.photoURL}
            width={36}
            height={36}
            alt={user.displayName}
            className="rounded-full"
          />
        </div>

        <div>
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xs text-gray-500">@{user.displayName}</div>
        </div>
      </div>
    )
  );
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

export default UserInfo;
