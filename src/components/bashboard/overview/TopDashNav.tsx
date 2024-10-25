import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import { FiSearch } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";


const TopNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const currentDate = new Date();

  return (
    <nav className="border-b py-1 px-5 text-black sticky top-0 bg-white z-10 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="relative flex flex-1 mx-4 max-w-[352px]  h-[56px] items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-1 pl-4 pr-8 bg-[#F5F5F5] border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <FiSearch className="absolute right-3 top-5 text-gray-500" />
        </div>

        <div className="relative flex gap-3 text-gray-500">
        <div className=" p-3 bg-[#F5F5F5] rounded-lg">
          <IoMoonOutline className="w-4 h-4" />
        </div>
        <div className=" p-3 bg-[#F5F5F5] rounded-lg">
          <IoNotificationsOutline className="w-4 h-4" />
        </div>
        <div className="flex flex-col self-end">
          <h1 className="text-base font-bold text-slate-500">Hello, Calvin</h1>
          <p className="text-xs font-light text-slate-400">
            {formatDate(currentDate)}
          </p>
        </div>
          <div
            className="flex items-center cursor-pointer rounded-lg"
            onClick={toggleDropdown}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-primary">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                className="rounded"
                alt="user-1"
                height={50}
                width={50}
              />
            </div>
            <svg
              className="ml-2 w-4 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-10 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
