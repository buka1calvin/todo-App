import React, { useEffect, useRef } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import { TiStarOutline } from "react-icons/ti";
import ChatRoom from "./ChatRoom";

interface Avatar {
  src: string;
  alt: string;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  avatars: Avatar[] | undefined;
  project: Project;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  avatars,
  project,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-5 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white p-4 shadow-xl z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 flex flex-col gap-4`}
      >
        <div className="flex justify-between text-sm">
          <h1 className="font-semibold">Project overView</h1>
          <p className="text-primary">See All</p>
        </div>
        <div className=" bg-slate-100 rounded-md text-xs">
          <div className="flex p-2 gap-3 items-center">
            <p className="flex items-center gap-2 font-semibold text-gray-400">
              <LuCalendarDays />
              Time Line:
            </p>
            <p className="flex gap-1">
              <span className="">April 14</span>-<span className="">May 7</span>
            </p>
          </div>
          <div className="flex p-2 gap-3 items-start">
            <p className="flex items-center gap-2 font-semibold text-gray-400">
              <GrGroup />
              Team:
            </p>
            <div className="grid md:grid-cols-3 gap-1 grid-cols-2">
              {avatars?.map((avatar) => (
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className="h-5 w-5 rounded-full border border-green-500"
                />
              ))}
            </div>
          </div>
          <div className="flex p-2 gap-3 items-center">
            <p className="flex items-center gap-2 font-semibold text-gray-400">
              <TiStarOutline />
              Status:
            </p>
            <p className="flex gap-1 font-medium">
              {!project.status && "Unknown"}
            </p>
          </div>
        </div>
        <ChatRoom />
      </div>
    </>
  );
};

export default Drawer;
