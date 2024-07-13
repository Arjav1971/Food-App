import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="section-container">
      <footer className="footer p-10 py-10 px-4 text-base-content">
        <aside>
          <img src="/logo.png" alt="" />
          <p className="my-4 md:w-40">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </aside>
        <nav className="space-y-1">
          <h6 className="footer-title font-semibold text-black opacity-100">
            Useful links
          </h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav className="space-y-1">
          <h6 className="footer-title font-semibold text-black opacity-100">
            Main Menu
          </h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav className="space-y-1">
          <h6 className="footer-title font-semibold text-black opacity-100">
            Contact Us
          </h6>
          <a className="link link-hover">foodie@email.com</a>
          <a className="link link-hover">+91 9301763998</a>
          <a className="link link-hover">Social media</a>
        </nav>
      </footer>
      <footer className="footer flex  px-4 footer-center p-4  text-base-content justify-between">
        <div className="flex gap-3">
            <div className="h-58 w-58 p-3 rounded-full bg-[#EDFFEF] text-black hover:bg-green hover:text-white">       
                 <FaFacebookF className="text-lg"/>

            </div>
            <div className="h-58 w-58 p-3 rounded-full bg-[#EDFFEF] text-black hover:bg-green hover:text-white">       
                 <FaInstagram className="text-lg"/>

            </div>
            <div className="h-58 w-58 p-3 rounded-full bg-[#EDFFEF] text-black hover:bg-green hover:text-white">       
                 <FaTwitter className="text-lg"/>

            </div>
            <div className="h-58 w-58 p-3 rounded-full bg-[#EDFFEF] text-black hover:bg-green hover:text-white">       
                 <FaYoutube className="text-lg"/>

            </div>
  
        </div>
        <aside>
          <p>Copyright © 2023 | All rights reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
