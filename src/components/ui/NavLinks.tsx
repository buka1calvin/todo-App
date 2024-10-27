import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineFolderMinus } from "react-icons/hi2";
import { IoMdStats } from "react-icons/io";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Home", href: "/dashboard", icon: GrHomeRounded },
  { name: "", href: "/dashboard/messages", icon: HiOutlineMail },
  { name: "", href: "/dashboard/tasks", icon: IoDocumentTextOutline },
  { name: "", href: "/dashboard/projects", icon: HiOutlineFolderMinus },
  { name: "", href: "/dashboard/settings", icon: IoMdStats },
];

export default function NavLinks() {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive =
          location.pathname === link.href ||
          (location.pathname.startsWith(link.href) &&
            link.href !== "/dashboard");
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx(
              "flex items-center justify-center text-sm font-light relative py-3",
              {
                "bg-gradient-to-r dark:from-purple-50/10 from-purple-100 to-transparent text-purple-600":
                  isActive,
                "text-gray-500": !isActive,
              }
            )}
          >
            {isActive && (
              <div className="absolute left-0 top-0 w-1 rounded-r-lg h-full bg-purple-600"></div>
            )}
            <LinkIcon className={`${isActive ? "text-purple-600":"text-gray-500 dark:text-gray-200"} w-4 h-4`} />
          </Link>
        );
      })}
    </div>
  );
}
