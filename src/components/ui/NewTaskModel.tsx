import React, { useRef, useEffect, useState } from "react";
import Chip from "./Chip";
import { useTranslation } from "react-i18next";

interface NewTaskModalProps {
  users: User[];
  project: Project;
  onCreateTask: (newTask: Task) => void; // Callback for creating a new task
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({
  users,
  project,
  onCreateTask,
  isOpen,
  setIsOpen,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [taskDetails, setTaskDetails] = useState({
    todo: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    from: "", // New "from" date field
    toDate: "", // New "toDate" field
    access: "Limited Access",
    comments: [] as string[],
  });
  const [userSearch, setUserSearch] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
      resetForm(); // Reset form on close
    }
  }, [isOpen]);

  const resetForm = () => {
    setSelectedUsers([]);
    setTaskDetails({
      todo: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      from: "", // Reset "from" field
      toDate: "", // Reset "toDate" field
      access: "Limited Access",
      comments: [],
    });
    setUserSearch("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleAddUser = (user: User) => {
    if (!selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId: number) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleCreateTask = () => {
    if (
      !taskDetails.todo ||
      !taskDetails.description ||
      selectedUsers.length === 0
    ) {
      alert(
        "Please provide task title, description, and select at least one assignee."
      );
      return;
    }

    //@ts-ignore
    const newTask: Task = {
      ...taskDetails,
      completed: false,
      userId: selectedUsers[0]?.id, // Assign head user as the primary assigned user
      assignees: selectedUsers.map((user) => user.id.toString()),
      projectId: project.id, // Set the project ID here
    };

    console.log("New Task created:", newTask);
    onCreateTask(newTask); // Call the onCreateTask prop with the new task
    setIsOpen(false);
  };

  return (
    <dialog ref={modalRef} className="modal dark:bg-white/10">
      <div className="modal-box p-5 dark:bg-gray-900">
        <h3 className="font-bold text-lg mb-4 dark:text-white">
          {" "}
          {t("dashboard.newTask.title", { projectName: project.name })}
        </h3>

        {/* Task Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {t("dashboard.newTask.taskTitle")}
          </label>
          <input
            type="text"
            name="todo"
            value={taskDetails.todo}
            onChange={handleInputChange}
            className="input w-full mb-2 text-sm border dark:text-white border-green-400 dark:bg-white/10"
            placeholder="Task title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {t("dashboard.newTask.description")}
          </label>
          <textarea
            name="description"
            value={taskDetails.description}
            onChange={handleInputChange}
            className="textarea w-full text-sm border dark:text-white border-green-400 dark:bg-white/10"
            placeholder="Task description"
          />
        </div>

        {/* Dates and Priority */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            {t("dashboard.newTask.fromDate")}
            </label>
            <input
              type="date"
              name="from"
              value={taskDetails.from}
              onChange={handleInputChange}
              className="input w-full text-sm border dark:text-white border-green-400 dark:bg-white/10"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            {t("dashboard.newTask.toDate")}
            </label>
            <input
              type="date"
              name="toDate"
              value={taskDetails.toDate}
              onChange={handleInputChange}
              className="input w-full text-sm border border-green-400 dark:text-white dark:bg-white/10"
            />
          </div>
        </div>

        <div className="mb-4 flex gap-4">
          <div className="w-1/2 dark:text-white">
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            {t("dashboard.newTask.dueDate")}
            </label>
            <input
              type="date"
              name="dueDate"
              value={taskDetails.dueDate}
              onChange={handleInputChange}
              className="input w-full text-sm border border-green-400 dark:text-white dark:bg-white/10"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            {t("dashboard.newTask.priority")}
            </label>
            <select
              name="priority"
              value={taskDetails.priority}
              onChange={handleInputChange}
              className="select w-full text-sm border border-green-400 dark:bg-gray-700 dark:text-white"
            >
              <option value="Low">{t("dashboard.newTask.low")}</option>
              <option value="Medium">{t("dashboard.newTask.medium")}</option>
              <option value="High">{t("dashboard.newTask.high")}</option>
            </select>
          </div>
        </div>

        {/* Access Level */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
          {t("dashboard.newTask.accessLevel")}
          </label>
          <select
            name="access"
            value={taskDetails.access}
            onChange={handleInputChange}
            className="select w-full text-sm border border-green-400 dark:bg-gray-700 dark:text-white"
          >
            <option value="Limited Access">
            {t("dashboard.newTask.limitedAccess")}
              </option>
            <option value="Full Access">{t("dashboard.newTask.fullAccess")}</option>
            <option value="All Access">{t("dashboard.newTask.allAccess")}</option>
          </select>
        </div>

        {/* User Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
          {t("dashboard.newTask.assignUsers")}
          </label>
          <input
            type="text"
            placeholder={t("dashboard.newTask.searchUser")}
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="input w-full mb-2 text-sm border border-green-400 dark:bg-white/10 dark:text-white"
          />
          <div className="border rounded p-2 max-h-28 overflow-y-auto text-xs font-medium">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleAddUser(user)}
                className="cursor-pointer p-2 hover:bg-gray-200 rounded dark:text-white dark:hover:text-gray-500"
              >
                {user.firstName} {user.lastName}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-2">
            {selectedUsers.map((user) => (
              <Chip
                key={user.id}
                label={user.firstName}
                onRemove={() => handleRemoveUser(user.id)}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="btn" onClick={() => setIsOpen(false)}>
          {t("dashboard.newTask.close")}
          </button>
          <button
            className="btn btn-primary dark:text-white"
            onClick={handleCreateTask}
            disabled={!taskDetails.todo || selectedUsers.length === 0}
          >
            {t("dashboard.newTask.createTask")}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default NewTaskModal;
