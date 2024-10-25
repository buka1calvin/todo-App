import ProjectOverView from "./components/bashboard/projects/ProjectOverView";
import Projects from "./components/bashboard/projects/Projects";
import Home from "./components/home/Home";
import DashLayout from "./Layouts/DashLayout";
import ProjectsLayout from "./Layouts/ProjectsLayout";


const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "dashboard",
    element: DashLayout,
    children: [
      {
        path: "projects",
        element: ProjectsLayout, // Projects layout containing a TopNav or other common elements
        children: [
          { path: "", element: Projects }, // Default Projects component under ProjectsLayout
          { path: ":id", element:ProjectOverView }, // Example child route under Projects
          { path: "subproject2", element: "" }, // Another child route
        ],
      },
    ],
  },
];

export default routes;
