
import { useState } from "react";
import { useLang } from "../../contexts/LangProvider";
import { IoMdArrowDropdown } from "react-icons/io";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-md shadow-sm text-sm"
      >
        <img
          src={language === "en" ? "/images/en-flag.png" : "/images/fr-flag.png"}
          alt={language === "en" ? "English" : "Français"}
          className="w-6 h-4"
        />
        <IoMdArrowDropdown className="text-gray-600 dark:text-gray-200 dark:hover:text-gray-600" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 dark:bg-gray-700 bg-white dark:text-white dark:hover:text-gray-700 rounded-md shadow-lg border border-gray-200">
          <button
            onClick={() => handleLanguageChange("en")}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <img src="/images/en-flag.png" alt="English" className="w-5 h-3 mr-2" />
            <span>English</span>
          </button>
          <button
            onClick={() => handleLanguageChange("fr")}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <img src="/images/fr-flag.png" alt="Français" className="w-5 h-3 mr-2" />
            <span>Français</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
