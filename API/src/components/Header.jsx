import React from "react";
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="sticky z-50 top-0 shadow-md">
        <nav className="h-16 bg-white border-gray-200">
          <div className="flex justify-center items-center gap-10 h-full ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 text-2xl font-medium`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/listvideo"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 text-2xl font-medium`
              }
            >
              List Video
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 text-2xl font-medium`
              }
            >
              About
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
