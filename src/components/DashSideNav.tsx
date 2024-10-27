import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { SlSettings } from "react-icons/sl";
import { HiOutlineUser } from "react-icons/hi2";
import NavLinks from "./ui/NavLinks";
import { useUserContext } from "../contexts/UsersContext";
import { MdOutlineRunningWithErrors } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const SideNav = () => {
  const { users, isLoading, error } = useUserContext();

  if (isLoading) return <div><ClipLoader color="#a855f7" size={15} /></div>;
  if (error) return <div><MdOutlineRunningWithErrors /></div>;

  const displayedUsers = users?.slice(0, 3) || [];

  return (
    <div className="flex z-10 flex-col justify-between w-[75px] h-full fixed left-0 top-0 text-gray-500 xs:h-fit items-center
      bg-white dark:bg-white/10 dark:backdrop-blur-lg dark:shadow-lg border border-gray-200 dark:border-none">
      <Link
        className="mb-2 flex justify-center rounded-md w-full items-center h-[80px]"
        to="/"
      >
        <img src="/images/calendar.png" alt="" className="h-8" />
      </Link>
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex grow flex-row lg:justify-between space-x-2 md:flex-col border-b-2 border-gray-200 pb-7 dark:border-gray-700">
          <NavLinks />
        </div>
        <div className="flex flex-col items-center gap-3 mt-7 border-b-2 border-gray-200 pb-5 dark:border-gray-700">
          {displayedUsers.map((user) => (
            <div className="relative h-fit w-fit" key={user.id}>
              <img
                src={user.image}
                alt={user.firstName}
                className="w-6 h-6 rounded-full border-2 border-purple-300"
              />
              <div className="absolute top-0 right-0 bg-green-500 border-2 border-white w-[10px] h-[10px] rounded-full"></div>
            </div>
          ))}
          <div className="flex justify-center items-center rounded-full border-2 dark:text-gray-200 text-gray-500 border-dashed border-gray-400 text-lg cursor-pointer">
            <AiOutlinePlus />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 w-full h-full justify-end py-5 text-gray-500 dark:text-gray-200">
          <Link to=""><SlSettings className="w-4 h-4" /></Link>
          <Link to=""><HiOutlineUser className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
