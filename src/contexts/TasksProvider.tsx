import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { mockProjects } from "../constants";
import toast from "react-hot-toast";

interface TaskContextType {
  projects: Project[] | undefined;
  isLoading: boolean;
  error: unknown;
  addTask: (task: Task, projectId: number) => void;
  updateTask: (taskId: number, taskData: Partial<Task>, projectId: number) => void;
  deleteTask: (taskId: number) => void; 
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

const saveProjectsToLocalStorage = (projects: Project[]) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

const getNextTaskId = (projects: Project[]): number => {
  const allTasks = projects.flatMap(project => project.tasks);
  const maxId = allTasks.length > 0 ? Math.max(...allTasks.map(task => task.id || 0)) : 0; // Ensure task.id is not undefined
  return maxId + 1; // Increment the maximum ID
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(mockProjects);
      saveProjectsToLocalStorage(mockProjects);
    }
  }, []);

  const { isLoading, error } = useQuery<Task[], Error>(
    "tasks",
    async () => {
      const response = await fetch("https://dummyjson.com/todos");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.todos;
    },
    {
      onSuccess: (fetchedTasks) => {
        const tasksDistributed = localStorage.getItem("tasksDistributed");

        if (!tasksDistributed) {
          const updatedProjects = [...projects];
          fetchedTasks.forEach((task) => {
            const randomProject =
              updatedProjects[Math.floor(Math.random() * updatedProjects.length)];
            randomProject.tasks.push(task);
          });
          setProjects(updatedProjects);
          saveProjectsToLocalStorage(updatedProjects);
          localStorage.setItem("tasksDistributed", "true");
        }
      }
    }
  );

  const addTaskMutation = useMutation(
    async (newTask: Task) => {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      return response.json();
    },
    {
      onSuccess: (newTaskFromServer, variables) => {
        const completeTask = {
          ...variables,
          ...newTaskFromServer,
        };

        queryClient.invalidateQueries("tasks");

        setProjects((prevProjects) => {
          const projectIndex = prevProjects.findIndex(
            (project) => project.id === completeTask.projectId
          );

          if (projectIndex === -1) return prevProjects;

          const updatedProjects = [...prevProjects];

          const taskExists = updatedProjects[projectIndex].tasks.some(
            (task) => task.todo === completeTask.todo
          );

          if (!taskExists) {
            updatedProjects[projectIndex].tasks.push(completeTask);
            saveProjectsToLocalStorage(updatedProjects);
            toast.success("Task created successfully!");
          } else {
            console.log("Duplicate task detected.");
          }
          return updatedProjects;
        });
      },
      onError: () => {
        toast.error("Failed to create task. Please try again.");
      },
    }
  );

  const addTask = (task: Task, projectId: number) => {
    if (typeof projectId !== 'number') {
      toast.error("Invalid project ID.");
      return;
    }

    const targetProject = projects.find((project) => project.id === projectId);
  
    if (!targetProject) {
      toast.error("Project not found.");
      return;
    }

    if (targetProject.tasks.some(existingTask => existingTask.todo === task.todo)) {
      toast.error("Task with this content already exists in the project.");
      return;
    }

    const newTask = { ...task, projectId, id: getNextTaskId(projects) };
    addTaskMutation.mutate(newTask);
  };

  const updateTaskMutation = useMutation(
    async ({ taskId, updatedTask }: { taskId: number; updatedTask: Partial<Task> }) => {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask)
      });
      return response.json();
    },
    {
      onSuccess: (partialUpdatedTask) => {
        queryClient.invalidateQueries("tasks");
  
        // Update projects in state and localStorage
        setProjects((prevProjects) => {
          const updatedProjects = prevProjects.map((project) => ({
            ...project,
            tasks: project.tasks.map((task) => {
              // Find the original task, then merge with the updated fields
              if (task.id === partialUpdatedTask.id) {
                return { ...task, ...partialUpdatedTask }; // Merge existing data with updates from server
              }
              return task;
            })
          }));
  
          // Save updated projects to localStorage
          saveProjectsToLocalStorage(updatedProjects);
          toast.success("Task updated successfully!");
          return updatedProjects;
        });
      },
      onError: (error) => {
        console.error("Error updating task:", error);
        toast.error("Failed to update task. Please try again.");
      },
    }
  );
  
  
  

  const updateTask = (taskId: number , taskData: Partial<Task>) => {
    updateTaskMutation.mutate({ taskId, updatedTask: taskData });
  };

  const deleteTaskMutation = useMutation(
    async (taskId: number) => {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: "DELETE"
      });
      return response.json();
    },
    {
      onSuccess: (_, taskId) => {
        queryClient.invalidateQueries("tasks");
        setProjects((prevProjects) => {
          const updatedProjects = prevProjects.map((project) => ({
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId)
          }));

          saveProjectsToLocalStorage(updatedProjects);
          return updatedProjects;
        });
      }
    }
  );

  const deleteTask = (taskId: number) => {
    deleteTaskMutation.mutate(taskId);
  };

  return (
    <TaskContext.Provider
      value={{ projects, isLoading, error, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
