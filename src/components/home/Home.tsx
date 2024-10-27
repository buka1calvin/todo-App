import { motion } from "framer-motion";
import Button1 from "../ui/Button1";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <section className=" dark:bg-gray-800 min-h-screen py-4 relative bg-white flex items-center justify-center overflow-hidden px-6 md:px-20">
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-[#e4e2e7] to-[#019b22] rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-r from-[#fffeff] to-[#1b802a] rounded-full blur-3xl opacity-70"></div>
      <div className="absolute left-0 h-full pointer-events-none opacity-20 flex flex-col space-y-10">
        <svg
          className="w-20 h-20 mt-10 md:w-32 md:h-32"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#019b22"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2L2 7l10 5 10-5-10-5zm0 7l10 5-10 5-10-5 10-5zm10 5v6M2 14v6"
          />
        </svg>
        <svg
          className="w-24 h-24 ml-4 md:w-40 md:h-40 md:ml-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#019b22"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5M12 6l-7 7 7 7"
          />
        </svg>
        <svg
          className="w-20 h-20 ml-2 md:w-28 md:h-28 md:ml-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#019b22"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a8 8 0 00-8-8H5v2h9a6 6 0 016 6z"
          />
        </svg>
      </div>

      {/* Right SVG decorations */}
      <div className="absolute right-0 h-full pointer-events-none opacity-20 flex flex-col space-y-10">
        <svg
          className="w-24 h-24 mb-8 md:w-36 md:h-36 md:mb-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#019b22"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M3 14h18"
          />
        </svg>
        <svg
          className="w-32 h-32 mr-4 md:w-48 md:h-48 md:mr-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#019b22"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16V6a1 1 0 011-1h3m-1 10H6a2 2 0 00-2 2v3h8v-3a2 2 0 00-2-2z"
          />
        </svg>
        <svg
          className="w-24 h-24 mr-2 md:w-32 md:h-32 md:mr-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#019b22"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2l-5 9h10l-5-9zm0 3.3a1.7 1.7 0 11-1.7 1.7 1.7 1.7 0 011.7-1.7zm7 11.7v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1h8z"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="flex dark:text-white flex-col-reverse md:flex-row gap-8 z-10 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <h1 className="text-secondary mb-6 text-2xl md:text-4xl font-extrabold">
            <span className="bg-clip-text bg-gradient-to-r">
              {t("homePage.heading")}
            </span>
          </h1>
          <p className="mb-4 text-sm md:text-base text-gray-800 dark:text-white">
            {t("homePage.description")}
          </p>
          <h2 className="text-green-500 mb-4 text-xl md:text-3xl font-bold">
            {t("homePage.startJourney")}
          </h2>
          <Button1 link="/dashboard" title={t("homePage.buttonText")} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-end w-full"
        >
          <div className="rounded-full bg-secondary border border-green-500 w-40 h-40 md:w-[250px] md:h-[250px] lg:w-[400px] lg:h-[400px] relative flex justify-center items-center overflow-hidden">
            <motion.img
              src="/images/calendar.png"
              alt="hero image"
              className="w-24 h-24 md:w-[150px] md:h-[150px] lg:w-[350px] lg:h-[350px]"
              animate={{ y: [0, -20, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
