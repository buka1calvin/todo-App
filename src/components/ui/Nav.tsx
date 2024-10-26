import { FC } from "react";

interface TaskType {
  name: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

const NavTasks: FC<TaskType> = ({ name, count, isActive, onClick }) => {
  return (
    <p
      className={`flex items-center gap-1 cursor-pointer ${
        isActive ? "font-bold text-primary" : "text-gray-500"
      } flex-col`}
      onClick={onClick}
    >
      <span className="flex items-center gap-1 w-full">
      {name}
      <span className="flex items-center justify-center bg-slate-100 h-5 w-5 rounded-md text-xs font-semibold">
        {count}
      </span>
      </span>
      {isActive && (
        <div className="w-full rounded-t-lg h-1 bg-primary"></div>
      )}
    </p>
  );
};

export default NavTasks;
