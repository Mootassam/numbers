import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const checkPath = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="flex justify-end gap-5 top-0 right-0 pr-10  bg-white">
      <div className={`${checkPath("/")}`}>
        <Link to="/">
          <h1 className="cursor-pointer pt-2 pb-2 pl-3 pr-3 font-s">
            Check Numbers
          </h1>
        </Link>
      </div>
      <div className={`${checkPath("/changepassword")}`}>
        <Link to="/changepassword">
          <h1 className="text-black cursor-pointer pt-2 pb-2 pl-3 pr-3 ">
            Change Password
          </h1>
        </Link>
      </div>
      <div className="flex items-center" onClick={() => logout()}>
        <img src="/logout.png" style={{ width: 20 }} />
        <h1 className="text-black cursor-pointer pt-2 pb-2 pl-2 pr-8 ">
          Logout
        </h1>
      </div>
    </div>
  );
}

export default Header;
