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
    <nav className="flex justify-between items-start">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/dashboard/projects">Workspace</Link>
          </li>
          {currentProject ? (
            <>
              <li>
                <Link to="">{currentProject.category}</Link>
              </li>
              <li>
                <span className="font-bold">{currentProject?.name}</span>
              </li>
            </>
          ) : null}
        </ul>
      </div>
      <div className="text-sm flex flex-col py-1 gap-2">
        <h1 className="self-end font-semibold">From 23 April</h1>
        <p className="flex items-center text-xs text-gray-500 gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div> uploaded 12
          minutes ago
        </p>
      </div>
    </nav>
  );
};

export default ProjectNav;
