import { FC, useState } from "react";
import { HiOutlineChat } from "react-icons/hi";
import TaskDropdown from "../../ui/TaskDropDown";
import MultiAvatar from "../../ui/MultiAvatars";
import EditTaskModal from "../../ui/EditTaskModal";

interface TaskCardProps {
  todo: string;
  completed: boolean;
  avatars: Avatar[] | undefined;
  task: Task; 
  onEditTask: (editedTask: Task) => void;
  project: Project;
  users:User[]
}

const defaultAvatar = "https://dummyjson.com/image/150";

const TaskCard: FC<TaskCardProps> = ({ todo, completed, avatars, task, onEditTask, project ,users}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    switch (option) {
      case "Review":
        console.log("Review selected");
        break;
      case "Edit":
        setEditModalOpen(true);
        break;
      case "Delete":
        console.log("Delete selected");
        break;
      default:
        break;
    }
  };

  return (
    <div className="card bg-white dark:bg-white/15 p-3 gap-2 text-sm">
      <img src={defaultAvatar} alt={todo} className="rounded-lg h-32" />
      <div className="flex justify-between items-center">
        <p
          className={`${
            completed ? "bg-green-100 text-green-600" : "text-orange-700 bg-orange-100"
          } text-xs font-semibold px-2 py-1 rounded-sm`}
        >
          {completed ? "Completed" : "Todo"}
        </p>
        <TaskDropdown
          options={["Review", "Edit", "Delete"]}
          onSelect={handleOptionSelect}
        />
      </div>
      <div className="h-full">
        <h1 className="text-xl font-bold dark:text-white">{todo}</h1>
        <p className="text-gray-500 dark:text-gray-200">subTitle</p>
      </div>
      <div className="flex justify-between text-gray-500 border-t dark:text-gray-200 border-gray-300 dark:border-gray-500 py-[6px]">
        <MultiAvatar avatars={avatars || []} showSurplus={false} />
        <div className="flex items-center gap-1 ">
          <HiOutlineChat />
          <p className="1">23</p>
        </div>
      </div>

      <EditTaskModal
        users={users || []}
        project={project}
        task={task}
        onEditTask={onEditTask}
        isOpen={isEditModalOpen}
        setIsOpen={setEditModalOpen}
      />
    </div>
  );
};

export default TaskCard;
