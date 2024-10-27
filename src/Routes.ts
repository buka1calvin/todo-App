import ProjectOverView from "./components/bashboard/projects/ProjectOverView";
import Projects from "./components/bashboard/projects/Projects";
import Home from "./components/home/Home";
import DashLayout from "./Layouts/DashLayout";
import Layout from "./Layouts/Layout";
import ProjectsLayout from "./Layouts/ProjectsLayout";


const routes = [
  {
    path: "/",
    element: Layout,
    children:[
      {
      path: "",
      element:Home,
      children: [
        { path: "", element:"" },
      ],
      }
    ]
  },
  {
    path: "dashboard",
    element: DashLayout,
    children: [
      {
        path: "projects",
        element: ProjectsLayout,
        children: [
          { path: "", element: Projects },
          { path: ":id", element:ProjectOverView },
          { path: "subproject2", element: "" },
        ],
      },
    ],
  },
];

export default routes;
