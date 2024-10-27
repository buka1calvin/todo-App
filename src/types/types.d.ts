type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
};

type Task = {
  id: number;
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
  assignees:string[],
  projectId:number;
  access:string;
};

type Project = {
  id: number;
  name: string;
  tasks: Task[];
  description?: string;
  imageUrl?: string;
  status?: string;
  category: string;
};

type Avatar = {
  src: string;
  alt: string;
};
