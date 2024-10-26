import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTaskContext } from "../../../contexts/TasksProvider";
import { CiUnlock } from "react-icons/ci";
import { useUserContext } from "../../../contexts/UsersContext";
import MultiAvatar from "../../ui/MultiAvatars";
import Selection from "../../ui/Selection";
import {  FaEquals } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { RiEqualizer2Line, RiDashboardLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import NavTasks from "../../ui/Nav";
import TaskCard from "./TaskCard";
import UserFormModal from "../../ui/UserFormModel";
import NewTaskModal from "../../ui/NewTaskModel";
import Drawer from "../../ui/ProjectDrawer";
import { FaCirclePlus } from "react-icons/fa6";

const ProjectOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, isLoading } = useTaskContext();
  const { users } = useUserContext();
  const [selectedAccess, setSelectedAccess] = useState<string>("Limited Access");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All Tasks");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const project = projects?.find((project) => project.id === Number(id));
  const avatars = project?.tasks
    .map((task) => users?.find((user) => user?.id === task.userId))
    .filter(Boolean)
    .map((user) => ({
      src: user?.image || "",
      alt: user?.firstName || "User",
    }));

  if (isLoading) return <p>Loading...</p>;
  if (!project) return <p>Project not found.</p>;

  const allTasks = project.tasks.length;
  const todoTasks = project.tasks.filter((task) => !task.completed).length;
  const completedTasks = project.tasks.filter((task) => task.completed).length;

  const handleCreateTask = (newTask: Task) => {
    console.log("Task created:", newTask);
    setIsTaskModalOpen(false);
  };

  const handleAssignUsersToTask = (userIds: string[], taskId: string) => {
    console.log(`Assigned users ${userIds.join(", ")} to task ${taskId}`);
  };

  const filteredTasks = project.tasks.filter((task) => {
    if (filter === "All Tasks") return true;
    if (filter === "Todo/In Progress") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <section className="w-full h-full flex flex-col gap-4">
      <h1 className="font-bold text-3xl mb-4">{project?.name}</h1>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <CiUnlock className="text-gray-400" />
          <Selection
            options={["Limited Access", "Full Access", "All Access"]}
            selected={selectedAccess}
            onSelect={(value) => setSelectedAccess(value)}
          />
          <div className="h-7 w-[2px] rounded-full bg-slate-300"></div>
          <MultiAvatar avatars={avatars || []} maxAvatars={4} />
          <FaCirclePlus
            className="text-primary hover:text-gray-600 h-7 w-7 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <AiOutlineLink className="text-primary w-5 h-5" />
          <div className="h-5 w-[2px] rounded-full bg-slate-300"></div>
          <FaEquals
            className="p-1 bg-primary text-white w-5 h-5 rounded cursor-pointer"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} // Toggle drawer
          />
          <RiDashboardLine className="text-primary w-5 h-5" />
        </div>
      </div>
      <div className="flex justify-between items-center text-gray-500 bg-white h-14 rounded-xl text-sm px-4">
        <div className="flex font-medium gap-4">
          <NavTasks
            name="All Tasks"
            count={allTasks}
            isActive={filter === "All Tasks"}
            onClick={() => setFilter("All Tasks")}
          />
          <NavTasks
            name="Todo/In Progress"
            count={todoTasks}
            isActive={filter === "Todo/In Progress"}
            onClick={() => setFilter("Todo/In Progress")}
          />
          <NavTasks
            name="Completed"
            count={completedTasks}
            isActive={filter === "Completed"}
            onClick={() => setFilter("Completed")}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center justify-center cursor-pointer border px-3 hover:shadow-inner hover:bg-slate-50 hover:shadow-gray-200">
            <RiEqualizer2Line />
            <p>Filter & Sort</p>
          </div>
          <button
            className="flex py-1 px-3 rounded border items-center gap-1 hover:shadow-inner hover:bg-slate-50 hover:shadow-gray-200"
            onClick={() => setIsTaskModalOpen(true)}
          >
            <FaPlus />
            New Task
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl self-center">
        {filteredTasks.map((task) => {
          const avatars = users
            ?.filter((user) => task?.userId === user.id)
            .map((user) => ({
              src: user.image || "",
              alt: user.firstName || "User",
            }));

          return (
            <TaskCard
            project={project}
              todo={task.todo}
              completed={task.completed}
              avatars={avatars}
              task={task}
              onEditTask={(editedTask) => console.log("Edited Task:", editedTask)}
              key={task.id}
              users={users || []}
            />
          );
        })}
      </div>
      {isModalOpen && (
        <UserFormModal
          users={users || []}
          tasks={project.tasks}
          onAssignUsersToTask={handleAssignUsersToTask}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
      {isTaskModalOpen && (
        <NewTaskModal
          users={users || []}
          project={project}
          onCreateTask={handleCreateTask}
          isOpen={isTaskModalOpen}
          setIsOpen={setIsTaskModalOpen}
        />
      )}
      {/* Drawer component */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} avatars={avatars} project={project}/>
    </section>
  );
};

export default ProjectOverview;
