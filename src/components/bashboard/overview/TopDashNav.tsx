import { FC, useState, useEffect, useRef } from "react";
import { formatDate } from "../../../utils/formatDate";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import ThemeSwitcher from "../../ui/ThemeSwitcher";
import LanguageSwitcher from "../../ui/LangSwitcher";
import { useTranslation } from "react-i18next";

interface TopNavbarProps {
  className?: string;
}

const TopNavbar: FC<TopNavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSearch = () => setShowSearch((prev) => !prev);
  const currentDate = new Date();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`border-b dark:border-gray-500 py-3 sm:py-2 px-5 text-black sticky top-0 bg-white dark:bg-gray-900 dark:text-white z-10 w-full ${className}`}
    >
      <div className="container mx-auto flex items-center justify-between relative">
        <div className="flex items-center gap-4">
          <img
            src="/images/calendar.png"
            alt="Logo"
            className="h-11 sm:hidden"
          />
          <div className="relative flex-1 w-[400px] hidden sm:flex items-center">
            <input
              type="text"
              placeholder={t("dashboard.topnav.searchPlaceholder")}
              className="w-full py-2 pl-4 pr-8 bg-[#F5F5F5] dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <FiSearch className="absolute right-3 text-gray-500 dark:text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
          <FiSearch
            className="text-xl sm:hidden cursor-pointer"
            onClick={toggleSearch}
          />
          {showSearch && (
            <div className="absolute top-16 left-0 px-4 pb-2 w-full">
              <div className="relative h-[40px]">
                <input
                  type="text"
                  placeholder={t("dashboard.topnav.searchPlaceholder")}
                  className="w-full py-1 pl-4 pr-8 bg-[#F5F5F5] dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <FiSearch
                  className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  onClick={toggleSearch}
                />
              </div>
            </div>
          )}

          <ThemeSwitcher />

          <div className="relative p-3 bg-[#F5F5F5] dark:bg-gray-800 rounded-lg">
            <IoNotificationsOutline className="w-4 h-4 relative" />
            <div className="absolute top-4 right-4 transform translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <h1 className="text-base font-bold text-slate-500 dark:text-slate-300">
              {t("dashboard.topnav.greeting")}
            </h1>
            <p className="text-xs font-light text-slate-400 dark:text-slate-500">
              {formatDate(currentDate)}
            </p>
          </div>

          <div
            ref={dropdownRef}
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
              className="ml-2 w-4 h-5 hidden sm:block text-gray-500 dark:text-gray-300"
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
            <div
              ref={dropdownRef}
              className="absolute right-14 mt-[160px] w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:ring-white"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t("dashboard.topnav.profile")}
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t("dashboard.topnav.settings")}
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t("dashboard.topnav.logout")}
              </a>
            </div>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
