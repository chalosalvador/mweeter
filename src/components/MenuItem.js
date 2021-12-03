import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const MenuItem = ({ route, label }) => {
  const router = useRouter();

  return (
    <li
      className={`menu-item ${
        route && router.pathname === route ? " active" : ""
      }`}
    >
      {route ? (
        <Link href={route} passHref>
          <a className="block">{label}</a>
        </Link>
      ) : (
        label
      )}
    </li>
  );
};

MenuItem.propTypes = {
  route: PropTypes.string,
  label: PropTypes.any,
};

export default MenuItem;
