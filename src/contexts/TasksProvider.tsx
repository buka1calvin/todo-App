import { useContext,createContext, ReactNode, useState } from "react";
import { mockProjects } from "../constants";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface TaskContextType {
    projects: Project[] | undefined;
    isLoading: boolean;
    error: unknown;
    addTask: (task: Task, projectId: number) => void;
    updateTask: (taskId: number, taskData: Partial<Task>, projectId: number) => void;
    deleteTask: (taskId: number, projectId: number) => void;
  }

const TaskContext=createContext<TaskContextType | undefined>(undefined)

export const useTaskContext=()=>{
    const context=useContext(TaskContext) 
    if(!context){
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
}

export const TasksProvider=({children}:{children:ReactNode})=>{
const [projects,setProjects]=useState<Project[]>(mockProjects)
const queryClient=useQueryClient()

const {data:tasks,isLoading,error}=useQuery<Task[],Error>(
    "tasks",
    async () => {
      const response = await fetch("https://dummyjson.com/todos");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data==",tasks)
      return data.todos;
    },
    {
      onSuccess: (fetchedTasks) => {
        // Assign fetched tasks to projects randomly or based on logic
        const updatedProjects = [...projects];
        fetchedTasks.forEach((task) => {
          const randomProject =
            updatedProjects[Math.floor(Math.random() * updatedProjects.length)];
          randomProject.tasks.push(task);
        });
        setProjects(updatedProjects);
      }
    }
  );
  const addTaskMutation = useMutation(
    async (newTask: Task) => {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      });
      return response.json();
    },
    {
      onSuccess: (newTask) => {
        queryClient.invalidateQueries("tasks"); // Invalidate task cache to refetch
        setProjects((prevProjects) => {
          const projectIndex = prevProjects.findIndex(
            (project) => project.id === newTask.projectId
          );
          const updatedProjects = [...prevProjects];
          updatedProjects[projectIndex].tasks.push(newTask); // Add new task to project
          return updatedProjects;
        });
      }
    }
  );

  const addTask = (task: Task, projectId: number) => {
    const newTask = { ...task, projectId };
    addTaskMutation.mutate(newTask);
  };

  // Update an existing task
  const updateTaskMutation = useMutation(
    async ({ taskId, updatedTask }: { taskId: number; updatedTask: Partial<Task> }) => {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask)
      });
      console.log("")
      return response.json();
    },
    {
      onSuccess: (updatedTask) => {
        queryClient.invalidateQueries("tasks"); // Invalidate task cache to refetch
        setProjects((prevProjects) => {
          const updatedProjects = prevProjects.map((project) => ({
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          }));
          return updatedProjects;
        });
      }
    }
  );

  const updateTask = (taskId: number, taskData: Partial<Task>, projectId: number) => {
    updateTaskMutation.mutate({ taskId, updatedTask: taskData });
  };

  // Delete a task
  const deleteTaskMutation = useMutation(
    async (taskId: number) => {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: "DELETE"
      });
      return response.json();
    },
    {
      onSuccess: (_, taskId) => {
        queryClient.invalidateQueries("tasks"); // Invalidate task cache to refetch
        setProjects((prevProjects) => {
          const updatedProjects = prevProjects.map((project) => ({
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId)
          }));
          return updatedProjects;
        });
      }
    }
  );

  const deleteTask = (taskId: number, projectId: number) => {
    deleteTaskMutation.mutate(taskId);
  };

  return (
    <TaskContext.Provider
      value={{ projects, isLoading, error, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}