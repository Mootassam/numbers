import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="flex justify-end gap-5 top-0 right-0 pr-10  bg-white">
      <div className="bg-gray-500">
        <Link to="/">
          <h1 className="text-white cursor-pointer pt-2 pb-2 pl-3 pr-3 ">
            Check Numbers
          </h1>
        </Link>
      </div>
      <div className="bg-gray-500">
        <Link to="/changepassword">
          <h1 className="text-white cursor-pointer pt-2 pb-2 pl-3 pr-3 ">
            Change Password
          </h1>
        </Link>
      </div>
      <div className="bg-red-500" onClick={() => logout()}>
        <h1 className="text-white cursor-pointer pt-2 pb-2 pl-8 pr-8 ">
          Logout
        </h1>
      </div>
    </div>
  );
}

export default Header;
