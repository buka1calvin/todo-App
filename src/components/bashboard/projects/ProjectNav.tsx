import { Link, useLocation } from "react-router-dom";
import { useTaskContext } from "../../../contexts/TasksProvider";
import { useTranslation } from "react-i18next";

const ProjectNav = () => {
  const { t } = useTranslation();
  const { projects } = useTaskContext();
  const location = useLocation();
  const projectId = location.pathname.split("/").pop();

  const currentProject = projects?.find(
    (project) => project.id === Number(projectId)
  );

  return (
    <nav className="flex justify-between items-start md:flex-row flex-col">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/dashboard/projects" className="dark:text-gray-200">
              {" "}
              {t("dashboard.projectNav.workspace")}
            </Link>
          </li>
          <>
            <li>
              <Link
                to=""
                className={`${
                  currentProject ? "dark:text-gray-300" : "text-gray-400"
                }`}
              >
                {currentProject?.category || t("dashboard.projectNav.category")}
              </Link>
            </li>
            <li>
              <span
                className={`${
                  currentProject
                    ? "font-bold dark:text-gray-300"
                    : "text-gray-400"
                }`}
              >
                {currentProject?.name || t("dashboard.projectNav.project")}
              </span>
            </li>
          </>
        </ul>
      </div>
      {currentProject && (
        <div className="text-sm flex md:flex-col py-1 gap-2 flex-row">
          <h1 className="self-end font-semibold dark:text-white">
            {t("dashboard.projectNav.fromDate", { date: "23 April" })}
          </h1>
          <p className="flex items-center text-xs text-gray-500 gap-1 dark:text-gray-200">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>{" "}
            {t("dashboard.projectNav.uploaded", { time: "12 minutes" })}
          </p>
        </div>
      )}
    </nav>
  );
};

export default ProjectNav;
