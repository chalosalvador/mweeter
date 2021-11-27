import React from "react";
import { Routes } from "constants/routes";
import LogoutButton from "components/LogoutButton";
import MenuItem from "components/MenuItem";

const Menu = () => {
  return (
    <ul className="mt-3">
      <MenuItem route={Routes.HOME} label="Home" />
      <MenuItem route={Routes.FOLLOWING} label="Following" />
      <MenuItem route={Routes.PROFILE} label="Your Profile" />
      <MenuItem label={<LogoutButton className="block w-full text-left" />} />
    </ul>
  );
};

export default Menu;
