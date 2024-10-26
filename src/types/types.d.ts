type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
};

type Task = {
  id?: number;
  todo: string;
  completed: boolean;
  userId?: number;
  priority?: string;
  description?: string;
  dueDate?: string;
  assignees?: string[];
  files?: File[];
  from?: string;
  toDate?: string;
  assignees:string[]
};

type Project = {
  id: number;
  name: string;
  tasks: Task[];
  description?: string; // Optional description of the project
  imageUrl?: string; // Optional image for the project
  status?: string; // Optional status field for the project
  category: string;
};

type Avatar = {
  src: string;
  alt: string;
};
