// src/components/ThemeSwitcher.tsx
import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // Set theme based on saved preference in local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Save theme preference to local storage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-[#F5F5F5] dark:bg-gray-800 rounded-lg text-gray-900 dark:text-yellow-400 transition-all duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? <BsSun className="w-4 h-4" /> : <BsMoon className="w-4 h-4" />}
    </button>
  );
};

export default ThemeSwitcher;
