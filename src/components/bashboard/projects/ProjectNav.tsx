import { Link, useLocation } from "react-router-dom";
import { useTaskContext } from "../../../contexts/TasksProvider";

const ProjectNav = () => {
  const { projects } = useTaskContext(); // Accessing the projects from context
  const location = useLocation(); // To track current route
  const projectId = location.pathname.split("/").pop(); // Extract project ID from the URL

  // Find the project based on the current project ID in the URL
  const currentProject = projects?.find(
    (project) => project.id === Number(projectId)
  );

  return (
    <nav className="flex justify-between items-start md:flex-row flex-col">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/dashboard/projects" className="dark:text-gray-200">Workspace</Link>
          </li>
            <>
              <li>
                <Link to="" className={`${currentProject ? "dark:text-gray-300":"text-gray-400"}`}>{currentProject?.category || "Category-All"}</Link>
              </li>
              <li>
                <span className={`${currentProject ? "font-bold dark:text-gray-300":"text-gray-400"}`}>{currentProject?.name || "project-All"}</span>
              </li>
            </>
        </ul>
      </div>
      {
        currentProject && 
        <div className="text-sm flex md:flex-col py-1 gap-2 flex-row">
        <h1 className="self-end font-semibold dark:text-white">From 23 April</h1>
        <p className="flex items-center text-xs text-gray-500 gap-1 dark:text-gray-200">
          <div className="w-2 h-2 rounded-full bg-green-500"></div> uploaded 12
          minutes ago
        </p>
      </div>
      }

    </nav>
  );
};

export default ProjectNav;
