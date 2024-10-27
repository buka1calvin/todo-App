// src/components/Navbar.js
import LanguageSwitcher from "./ui/LangSwitcher";
import ThemeSwitcher from "./ui/ThemeSwitcher";

const Navbar = () => {
  return (
    <nav className="flex sm:px-16 px-4 z-30 items-center justify-between bg-white dark:bg-gray-800 shadow-md h-[70px] w-full">
      <div className="dark:text-white text-green-600 font-bold flex items-center gap-1">
      <img src="/images/calendar.png" className="h-16 w-16"/>
      ToDo App
      </div>
      <div className="flex items-center gap-3">
      <ThemeSwitcher />
      <LanguageSwitcher/>
      </div>
    </nav>
  );
};

export default Navbar;
