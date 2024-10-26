import React, { useRef, useEffect, useState } from "react";
import Chip from "./Chip";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
}

interface Project {
  name: string;
}

interface NewTaskModalProps {
  users: User[];
  project: Project;
  onCreateTask: (newTask: Task) => void;
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

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
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
    }
  }, [isOpen]);

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

  const handleCreateTask = () => {
    const newTask: Task = {
      ...taskDetails,
      completed: false,
      assignees: selectedUsers.map((user) => user.id.toString()),
    };
    onCreateTask(newTask);
    setIsOpen(false);
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box p-5">
        <h3 className="font-bold text-lg mb-4">Create New Task for {project.name}</h3>

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

        {/* From Date, To Date, Due Date, and Priority */}
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
              className="select w-full text-sm  border border-green-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Access Level */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
          <select
            name="access"
            value={taskDetails.access}
            onChange={handleInputChange}
            className="select w-full text-sm border border-green-400"
          >
            <option value="Limited Access">Limited Access</option>
            <option value="Full Access">Full Access</option>
            <option value="All Access">All Access</option>
          </select>
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
            {selectedUsers.map((user) => (
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
            onClick={handleCreateTask}
            disabled={!taskDetails.todo || selectedUsers.length === 0}
          >
            Create Task
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default NewTaskModal;
