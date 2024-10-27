import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { IoDocumentTextOutline} from "react-icons/io5";
import { IoMdStats } from "react-icons/io";
import { HiOutlineFolderMinus } from "react-icons/hi2";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

const bottomLinks = [
  { name: "Home", href: "/dashboard", icon: GrHomeRounded },
  { name: "Messages", href: "/dashboard/messages", icon: HiOutlineMail },
  { name: "Tasks", href: "/dashboard/tasks", icon: IoDocumentTextOutline },
  { name: "Projects", href: "/dashboard/projects", icon: HiOutlineFolderMinus },
  { name: "Stats", href: "/dashboard/settings", icon: IoMdStats },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="flex justify-around bg-white dark:bg-gray-900 border-t border-gray-200 py-3">
      {bottomLinks.map((link) => {
        const LinkIcon = link.icon;
        const isActive = location.pathname === link.href;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx("flex flex-col items-center text-xs", {
              "text-purple-600 dark:text-purple-500": isActive,
              "text-gray-500 dark:text-gray-200": !isActive,
            })}
          >
            <LinkIcon className={`${isActive ? "text-purple-600 dark:text-purple-500" : "text-gray-500 dark:text-gray-200"} w-5 h-5`} />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
