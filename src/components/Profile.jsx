import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { BiLogOutCircle } from "react-icons/bi";
import { MdOutlineSettings } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdSpaceDashboard } from "react-icons/md";
import {Link} from "react-router-dom"
const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        alert("Logout Successfull");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
        alert("Logout Failed");
      });
  };
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle"
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                ) : (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                )}
              </div>
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-4 rounded-xl">
            {/* Sidebar content here */}
            <li className="bg-[#EDFFEF] rounded-lg text-black font-bold">
              <a href="/update-profile">
                <CgProfile className="text-lg" />
                Profile
              </a>
            </li>
            <li className="bg-[#EDFFEF] rounded-lg text-black font-bold">
              <Link to="orders">
                <FaShoppingCart className="text-lg" />
                Order
              </Link>
            </li>
            <li className="bg-[#EDFFEF] rounded-lg text-black font-bold">
              <Link to="/dashboard">
                <MdSpaceDashboard className="text-lg" />
                Dashboard
              </Link>
            </li>
            <li className="bg-[#EDFFEF] rounded-lg text-black font-bold">
              <a>
                <MdOutlineSettings className="text-lg" />
                Setting
              </a>
            </li>
            <li className="bg-[#EDFFEF] rounded-lg text-black font-bold">
              <a onClick={handleLogout}>
                <BiLogOutCircle className="text-lg" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
