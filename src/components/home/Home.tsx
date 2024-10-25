import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button1 from "../ui/Button1";
const Home = () => {
  return (
    <section className="max-w-[1440px] h-screen relative bg-white flex items-center overflow-hidden px-20">
    <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-[#e4e2e7] to-[#019b22] rounded-full blur-3xl opacity-70"></div>
    <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-r from-[#fffeff] to-[#1b802a] rounded-full blur-3xl opacity-70"></div>
    <div className="absolute left-0 h-full pointer-events-none opacity-20 flex flex-col space-y-10">
      {/* SVGs for decorative elements */}
      <svg
        className="w-32 h-32 mt-10"
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
        className="w-40 h-40 ml-6"
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
        className="w-28 h-28 ml-4"
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

    <div className="absolute right-0 h-full pointer-events-none opacity-20 flex flex-col space-y-10">
      {/* More SVGs for decorative elements */}
      <svg
        className="w-36 h-36 mb-10"
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
        className="w-48 h-48 mr-6"
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
        className="w-32 h-32 mr-8"
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
    <div className="flex gap-8 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
      >
        <h1 className="text-secondary mb-6 text-4xl font-extrabold">
          <span className="bg-clip-text bg-gradient-to-r ">
            Welcome to Our AI-Powered Platform
          </span>
        </h1>
        <p className="mb-4 text-sm lg:leading-normal text-gray-800">
          Your future starts here! Our platform allows students to check their
          final exam marks, view their allocated schools based on performance,
          and explore different study sections. With AI, the Ministry of
          Education can efficiently distribute students to various schools
          across the country.
        </p>

        <h2 className="text-green-500 mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
          Discover your path today!
        </h2>

        <br />
        <br />
        <br />
        <Button1 link="/dashboard" title="Let's Get Started"/>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-4 place-self-center mt-4 lg:mt-0"
      >
        <div className="rounded-full bg-secondary border border-green-500 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative flex justify-center items-center overflow-hidden">
          <motion.img
            src="/images/calendar.png"
            alt="hero image"
            className="w-[150px] h-[150px] lg:w-[350px] lg:h-[350px]"
            animate={{
              y: [0, -20, 0],
            }}
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
