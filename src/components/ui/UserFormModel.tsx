import React, { useRef, useEffect, useState } from "react";
import Chip from "./Chip";


interface UserFormModalProps {
    users: User[];
    tasks: Task[];
    onAssignUsersToTask: (userIds: string[], taskId: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ users, tasks, onAssignUsersToTask, isOpen, setIsOpen }) => {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [userSearch, setUserSearch] = useState("");
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
            setSelectedUsers([]);
            setSelectedTask(null);
            setUserSearch("");
        }
    }, [isOpen]);

    // Filter users based on search query
    const filteredUsers = users?.filter(user =>
        user.firstName.toLowerCase().includes(userSearch.toLowerCase())
    );

    const handleAddUser = (user: User) => {
        if (!selectedUsers.some(selectedUser => selectedUser.id === user.id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleRemoveUser = (userId: number) => {
        setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
    };

    const handleAssign = () => {
        if (selectedUsers.length > 0 && selectedTask) {
            onAssignUsersToTask(selectedUsers.map(user => user.id.toString()), selectedTask);
            setIsOpen(false);
        }
    };

    return (
        <dialog ref={modalRef} className="modal dark:bg-white/10">
            <div className="modal-box p-5 dark:bg-gray-900">
                <h3 className="font-bold text-lg mb-4 dark:text-white">Assign Users to Task</h3>

                {/* User Search and Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                        Search Users
                    </label>
                    <input
                        type="text"
                        placeholder="Search user..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="input w-full mb-2 text-sm dark:bg-white/10 dark:text-white"
                    />

                    {/* Display Filtered Users for Selection */}
                    <div className="border rounded p-2 max-h-28 overflow-y-auto text-xs font-medium">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => handleAddUser(user)}
                                className="cursor-pointer p-2 hover:bg-gray-200 rounded dark:text-white dark:hover:text-gray-700"
                            >
                                {user.firstName} {user.lastName}
                            </div>
                        ))}
                    </div>

                    {/* Display Selected Users as Chips */}
                    <div className="flex flex-wrap mt-2">
                        {selectedUsers.map(user => (
                            <Chip
                                key={user.id}
                                label={user.firstName}
                                onRemove={() => handleRemoveUser(user.id)}
                            />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                        Select Task
                    </label>
                    <select
                        onChange={(e) => setSelectedTask(e.target.value)}
                        className="select w-full dark:bg-gray-700 dark:text-white"
                        value={selectedTask || ""}
                    >
                        <option value="">Select Task</option>
                        {tasks.map(task => (
                            <option key={task.id} value={task.id?.toString()}>
                                {task.todo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button className="btn" onClick={() => setIsOpen(false)}>
                        Close
                    </button>
                    <button
                        className="btn btn-primary dark:text-white"
                        onClick={handleAssign}
                        disabled={!selectedTask || selectedUsers.length === 0}
                    >
                        Assign
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default UserFormModal;
