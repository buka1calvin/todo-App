import React, { useEffect, useRef, useState } from "react";
import Chip from "./Chip";

interface EditTaskModalProps {
  users: User[];
  project: Project;
  task: Task;
  onEditTask: (editedTask: Task) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  users,
  project,
  task,
  onEditTask,
  isOpen,
  setIsOpen,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>(task?.assignees?.map(id => users.find(user => user.id === Number(id))).filter(Boolean) as User[]);
  const [taskDetails, setTaskDetails] = useState<Task>({ ...task });
  const [userSearch, setUserSearch] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
      setSelectedUsers([]);
      setTaskDetails(task);
      setUserSearch("");
    }
  }, [isOpen, task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
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

  const handleEditTask = () => {
    const editedTask: Task = {
      ...taskDetails,
      assignees: selectedUsers.map(user => user.id.toString()),
    };
    onEditTask(editedTask);
    setIsOpen(false);
  };

  return (
    <dialog ref={modalRef} className="modal dark:bg-white/10">
      <div className="modal-box p-5 dark:bg-gray-900">
        <h3 className="font-bold text-lg mb-4 dark:text-white">Edit Task for {project.name}</h3>

        {/* Task Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Task Title</label>
          <input
            type="text"
            name="todo"
            value={taskDetails.todo}
            onChange={handleInputChange}
            className="input w-full mb-2 text-sm border dark:bg-white/10 dark:text-white border-green-400"
            placeholder="Task title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={taskDetails.description}
            onChange={handleInputChange}
            className="textarea w-full text-sm dark:bg-white/10 dark:text-white border border-green-400"
            placeholder="Task description"
          />
        </div>

        {/* Dates and Priority */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              name="from"
              value={taskDetails.from}
              onChange={handleInputChange}
              className="input w-full text-sm dark:bg-white/10 dark:text-white border border-green-400"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              name="toDate"
              value={taskDetails.toDate}
              onChange={handleInputChange}
              className="input w-full text-sm dark:bg-white/10 border dark:text-white border-green-400"
            />
          </div>
        </div>

        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={taskDetails.dueDate}
              onChange={handleInputChange}
              className="input w-full text-sm dark:text-white dark:bg-white/10 border border-green-400"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-2">Priority</label>
            <select
              name="priority"
              value={taskDetails.priority}
              onChange={handleInputChange}
              className="select w-full text-sm dark:bg-gray-700 border dark:text-white border-green-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Completed Status */}
        <div className="mb-4">
          <label className="inline-flex items-center dark:text-white">
            <input
              type="checkbox"
              name="completed"
              checked={taskDetails.completed}
              onChange={handleInputChange}
              className="form-checkbox dark:text-white"
            />
            <span className="ml-2 dark:text-white">Completed</span>
          </label>
        </div>

        {/* Access Level */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Access Level</label>
          <select
            name="access"
            value={taskDetails.access}
            onChange={handleInputChange}
            className="select w-full text-sm border border-green-400 dark:bg-gray-700 dark:text-white"
          >
            <option value="Limited Access">Limited Access</option>
            <option value="Full Access">Full Access</option>
            <option value="All Access">All Access</option>
          </select>
        </div>

        {/* User Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Assign Users</label>
          <input
            type="text"
            placeholder="Search user..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="input w-full mb-2 text-sm border dark:bg-white/10 dark:text-white border-green-400"
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
            {selectedUsers?.map((user) => (
              <Chip key={user.id} label={user.firstName} onRemove={() => handleRemoveUser(user.id)} />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-action">
          <button className="btn" onClick={() => setIsOpen(false)}>Cancel</button>
          <button className="btn btn-primary dark:text-white" onClick={handleEditTask}>Save</button>
        </div>
      </div>
    </dialog>
  );
};

export default EditTaskModal;
