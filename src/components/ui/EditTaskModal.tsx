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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleEditTask = () => {
    const editedTask: Task = {
      ...taskDetails,
      assignees: selectedUsers.map((user) => user.id.toString()),
    };
    onEditTask(editedTask);
    setIsOpen(false);
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box p-5">
        <h3 className="font-bold text-lg mb-4">Edit Task for {project.name}</h3>

        {/* Task Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
          <input
            type="text"
            name="todo"
            value={taskDetails.todo}
            onChange={handleInputChange}
            className="input w-full mb-2 text-sm border border-green-400"
            placeholder="Task title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={taskDetails.description}
            onChange={handleInputChange}
            className="textarea w-full text-sm border border-green-400"
            placeholder="Task description"
          />
        </div>

        {/* Dates and Priority */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              name="from"
              value={taskDetails.from}
              onChange={handleInputChange}
              className="input w-full text-sm border border-green-400"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              name="toDate"
              value={taskDetails.toDate}
              onChange={handleInputChange}
              className="input w-full text-sm border border-green-400"
            />
          </div>
        </div>

        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={taskDetails.dueDate}
              onChange={handleInputChange}
              className="input w-full text-sm border border-green-400"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              name="priority"
              value={taskDetails.priority}
              onChange={handleInputChange}
              className="select w-full text-sm border border-green-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* User Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Assign Users</label>
          <input
            type="text"
            placeholder="Search user..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="input w-full mb-2 text-sm border border-green-400"
          />
          <div className="border rounded p-2 max-h-28 overflow-y-auto text-xs font-medium">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleAddUser(user)}
                className="cursor-pointer p-2 hover:bg-gray-200 rounded"
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

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="btn" onClick={() => setIsOpen(false)}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={handleEditTask}
            disabled={!taskDetails.todo || selectedUsers?.length === 0} // Disable if no title or no users
          >
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditTaskModal;
