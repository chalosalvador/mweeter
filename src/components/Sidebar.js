import Menu from "components/Menu";
import UserInfo from "components/UserInfo";
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen min-w-min py-6 px-5 bg-gray-50">
      <div className="text-blue-400 text-2xl font-semibold">mweeter</div>
      <Menu />
      <hr className="my-4" />
      <UserInfo />
    </div>
  );
};

export default Sidebar;
