// src/components/Navbar.js
import ThemeSwitcher from "./ui/ThemeSwitcher";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md h-20 w-full">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">My App</h1>
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
