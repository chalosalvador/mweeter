import Image from "next/image";
import { useAuth } from "hooks/useAuth";

const UserInfo = () => {
  const { user } = useAuth();

  return (
    user && (
      <div className="flex cursor-default">
        <div className="mr-3">
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

export default UserInfo;
