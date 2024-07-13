import React, { useState, useEffect, useContext } from "react";
import logo from "../../public/Frame 1logo.png";
import { FiPhoneCall } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user } = useAuth();

  console.log(user);
  const [cart, refetch] = useCart();
  console.log(cart);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navItems = (
    <>
      <li className="hover:bg-green hover:text-white rounded-xl transition-colors duration-200 ease-in-out">
        <a href="/" className="block px-4 py-2">
          Home
        </a>
      </li>

      <li>
        <details>
          <summary className="hover:bg-green hover:text-white rounded-xl transition-colors duration-200 ease-in-out">
            Menu
          </summary>
          <ul className="p-2">
            <li className="hover:bg-green hover:text-white rounded-xl transition-colors duration-200 ease-in-out font-medium">
              <a href="/menu">All</a>
            </li>
            <li className="hover:bg-green hover:text-white rounded-xl transition-colors duration-200 ease-in-out font-medium">
              <a href="/menu">Salad</a>
            </li>
            <li className="hover:bg-green hover:text-white rounded-xl transition-colors duration-200 ease-in-out font-medium">
              <a href="/menu">Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary className="hover:bg-green hover:text-white rounded-xl transition-colors duration-200 ease-in-out">Services</summary>
          <ul className="p-2 font-medium ">
            <li>
              <a>Order Online</a>
            </li>
            <li>
              <a>Table Booking</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li className="hover:bg-green hover:text-white rounded-xl transition-colors duration-200 ease-in-out">
        <a href="/">Offers</a>
      </li>
    </>
  );
  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div
        className={`navbar py-0 xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <details>
                  <summary>Menu</summary>
                  <ul className="p-2">
                    <li>
                      <a href="/menu">All</a>
                    </li>
                    <li>
                      <a href="/menu">Salad</a>
                    </li>
                    <li>
                      <a href="/menu">Pizza</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Services</summary>
                  <ul className="p-2">
                    <li>
                      <a>Order Online</a>
                    </li>
                    <li>
                      <a>Table Booking</a>
                    </li>
                    <li>
                      <a>Order Tracking</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a href="/">Offers</a>
              </li>
            </ul>
          </div>
          <a href="/">
            <img className="mt-5" src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-lg">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <button className="btn btn-ghost btn-circle hidden lg:flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {
            <Link to="cart-page">
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle lg:flex hidden items-center justify-center"
              >
                <div class="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span class="badge badge-sm indicator-item">
                    {cart?.length}
                  </span>
                </div>
              </div>
            </Link>
          }
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              className="btn bg-green rounded-full px-6 text-white flex items-center gap-2"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <FaUser /> Login
            </button>
          )}

          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
