import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const defaultAvatar = "https://dummyjson.com/image/150";

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const {t}=useTranslation()
  const { name, tasks, description, imageUrl, status,id } = project;

  return (
    <div className="bg-white dark:bg-white/10 dark:border-gray-500 shadow-md hover:shadow-lg transition-shadow duration-200 w-full p-4 border border-gray-200">
      <figure className="w-full">
        <img
          src={imageUrl || defaultAvatar} 
          alt={name}
          className="w-full h-40 object-cover"
        />
      </figure>
      <div className="pt-4">
        <h2 className="text-base font-semibold text-gray-700 dark:text-white">{name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 text-pretty">
          {description || t("dashboard.projectsList.projectCard.noDescription")}
        </p>
        <div className="flex justify-between ">
          <p className="text-sm text-gray-200 mt-2">{t("dashboard.projectsList.projectCard.tasks")}: {tasks.length}</p>
          <p className="text-sm text-gray-200 mt-2">
          {t("dashboard.projectsList.projectCard.status")}:{"  "}
            <span className="bg-gray-300 text-gray-600 font-semibold p-1 text-xs">
              {status || t("dashboard.projectsList.projectCard.unknown")}
            </span>
          </p>
        </div>
        <div className="flex justify-start mt-4">
          <button className="bg-primary text-white text-sm py-1 px-3 hover:bg-gray-800 transition-colors duration-150">
            <Link to={`/dashboard/projects/${id}`}>
            {t("dashboard.projectsList.projectCard.viewDetails")}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
