import React, { FC } from "react";

interface TaskType {
  name: string;
  count: number;
}
const NavTasks: FC<TaskType> = ({ name, count }) => {
  return (
    <p className="flex items-center gap-1">
      {name}
      <span className=" bg-slate-100 p-1 rounded-md text-xs font-semibold">
        {count}
      </span>
    </p>
  );
};

export default NavTasks;
