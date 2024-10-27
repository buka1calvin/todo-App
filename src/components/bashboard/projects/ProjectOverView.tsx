import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTaskContext } from "../../../contexts/TasksProvider";
import { CiUnlock } from "react-icons/ci";
import { useUserContext } from "../../../contexts/UsersContext";
import MultiAvatar from "../../ui/MultiAvatars";
import Selection from "../../ui/Selection";
import { FaEquals } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { RiEqualizer2Line, RiDashboardLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import NavTasks from "../../ui/Nav";
import TaskCard from "./TaskCard";
import UserFormModal from "../../ui/UserFormModel";
import NewTaskModal from "../../ui/NewTaskModel";
import Drawer from "../../ui/ProjectDrawer";
import { FaCirclePlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const ProjectOverview: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { projects, isLoading, addTask, updateTask } = useTaskContext();
  const { users } = useUserContext();
  const [selectedAccess, setSelectedAccess] = useState<string>(
    `${t("dashboard.projectOverview.limitedAccess")}`
  );
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

  if (isLoading) return <p>{t("dashboard.projectOverview.loading")}</p>;
  if (!project) return <p>{t("dashboard.projectOverview.notFound")}</p>;

  const allTasks = project.tasks.length;
  const todoTasks = project.tasks.filter((task) => !task.completed).length;
  const completedTasks = project.tasks.filter((task) => task.completed).length;

  const handleCreateTask = (newTask: Task) => {
    console.log("Task created:", newTask);
    newTask.projectId = project.id;
    addTask(newTask, project.id);
    setIsTaskModalOpen(false);
  };

  const handleAssignUsersToTask = (userIds: string[], taskId: string) => {
    console.log(`Assigned users ${userIds.join(", ")} to task ${taskId}`);
  };

  const handleEditTask = (editedTask: Task) => {
    console.log("Task edited:", editedTask);
    console.log(typeof editedTask.id);
    const taskId = Number(editedTask.id);
    if (!isNaN(taskId)) {
      updateTask(
        taskId,
        {
          todo: editedTask.todo,
          description: editedTask.description,
          from: editedTask.from,
          toDate: editedTask.toDate,
          dueDate: editedTask.dueDate,
          priority: editedTask.priority,
          completed: editedTask.completed,
          access: editedTask.access,
          assignees: editedTask.assignees,
        },
        project.id
      );
    } else {
      console.error("Task ID is undefined or not a valid number.");
    }
  };

  const filteredTasks = project.tasks.filter((task) => {
    if (filter === "All Tasks") return true;
    if (filter === "Todo/In Progress") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <section className="w-full h-full flex flex-col gap-4 py-3">
      <h1 className="font-bold text-3xl mb-4">{project?.name}</h1>
      <div className="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4">
        <div className="flex gap-3 items-center md:w-fit w-full md:justify-start justify-between">
          <CiUnlock className="text-gray-400" />
          <Selection
            options={[
              `${t("dashboard.projectOverview.limitedAccess")}`,
              `${t("dashboard.projectOverview.fullAccess")}`,
              `${t('dashboard.projectOverview.allAccess')}`,
            ]}
            selected={selectedAccess}
            onSelect={(value) => setSelectedAccess(value)}
          />
          <div className="h-7 w-[2px] rounded-full bg-slate-300"></div>
          <MultiAvatar avatars={avatars || []} maxAvatars={4} />
          <FaCirclePlus
            className="text-primary dark:text-purple-500 hover:text-gray-600 h-7 w-7 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="flex items-center md:justify-center gap-3 md:w-fit w-full justify-end">
          <AiOutlineLink className="text-primary dark:text-purple-500 w-5 h-5" />
          <div className="h-5 w-[2px] rounded-full bg-slate-300"></div>
          <FaEquals
            className="p-1 bg-primary dark:bg-purple-500 text-white w-5 h-5 rounded cursor-pointer"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          />
          <RiDashboardLine className="text-primary dark:text-purple-500 w-5 h-5" />
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:gap-0 gap-4 py-1 justify-between items-center text-gray-500 bg-white dark:bg-white/10 md:h-14 rounded-xl text-sm px-4">
        <div className="flex font-medium gap-4">
          <NavTasks
            name={t("dashboard.projectOverview.allTasks")}
            count={allTasks}
            isActive={filter === "All Tasks"}
            onClick={() => setFilter("All Tasks")}
          />
          <NavTasks
            name={t("dashboard.projectOverview.todoTasks")}
            count={todoTasks}
            isActive={filter === "Todo/In Progress"}
            onClick={() => setFilter("Todo/In Progress")}
          />
          <NavTasks
            name={t("dashboard.projectOverview.completedTasks")}
            count={completedTasks}
            isActive={filter === "Completed"}
            onClick={() => setFilter("Completed")}
          />
        </div>
        <div className="flex gap-4 md:w-fit w-full justify-end dark:text-gray-200">
          <div className="flex items-center justify-center cursor-pointer border dark:hover:text-gray-500 dark:border-gray-500 px-3 hover:shadow-inner hover:bg-slate-50 hover:shadow-gray-200">
            <RiEqualizer2Line />
            <p>{t('dashboard.projectOverview.filterSort')}</p>
          </div>
          <button
            className="flex py-1 px-3 rounded border items-center dark:border-gray-500 dark:hover:text-gray-500 gap-1 hover:shadow-inner hover:bg-slate-50 hover:shadow-gray-200"
            onClick={() => setIsTaskModalOpen(true)}
          >
            <FaPlus />
            {t('dashboard.projectOverview.newTask')}
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
              onEditTask={handleEditTask}
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
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        avatars={avatars}
        project={project}
      />
    </section>
  );
};

export default ProjectOverview;
