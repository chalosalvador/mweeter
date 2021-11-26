import React from "react";
import Image from "next/image";
import { useAuth } from "../hooks/useAuth";

const UserInfo = () => {
  const { user } = useAuth();

  return (
    user && (
      <div>
        <Image
          src={user.photoURL}
          width={40}
          height={40}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div>@{user.username}</div>
      </div>
    )
  );
};

export default UserInfo;
