import React, { useState } from "react";
import { useTaskContext } from "../../../contexts/TasksProvider";
import ProjectCard from "../../ui/ProjectCard";
import useSearch from "../../../hooks/useSearch";
import { MoonLoader } from "react-spinners";
import { RiEqualizerLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const ProjectsList = () => {
  const {t}=useTranslation()
  const { projects, isLoading, error } = useTaskContext();
  const [filterByStatus, setFilterByStatus] = useState<string>("");
  const { query, handleSearch, filteredData } = useSearch(projects || [], {
    fields: ["name", "description"],
  });

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByStatus(e.target.value);
  };

  const filteredProjects = filterByStatus
    ? filteredData.filter((project) => project.status === filterByStatus)
    : filteredData;

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <MoonLoader color="#000" />
      </div>
    );
  }

  if (error) {
    return <p>{t("dashboard.projectsList.errorLoading", { error: error.toString() })}</p>;
  }

  return (
    <section className="w-full flex flex-col md:p-4 py-4">
      <div className="mb-4 w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <input
          type="text"
          placeholder={t("dashboard.projectsList.searchPlaceholder")}
          value={query}
          onChange={handleSearch}
          className="input input-bordered border-gray-500 w-full dark:bg-white/10 px-4 py-2 rounded-md text-gray-700 dark:text-white"
        />
        <div className="flex items-center gap-2 w-full sm:w-[40%] lg:w-[30%]">
          <RiEqualizerLine className="text-gray-600 dark:text-white text-xl" />
          <select
            value={filterByStatus}
            onChange={handleStatusFilter}
            className="select select-bordered dark:bg-white/10 dark:text-white w-full py-2 px-3 rounded-md text-gray-700"
          >
            <option value="" className="text-gray-700 dark:text-gray-400">
            {t("dashboard.projectsList.allStatuses")}
            </option>
            <option value="completed" className="text-gray-700 dark:text-gray-400">
            {t("dashboard.projectsList.completed")}
            </option>
            <option value="in-progress" className="text-gray-700 dark:text-gray-400">
            {t("dashboard.projectsList.inProgress")}
            </option>
            <option value="pending" className="text-gray-700 dark:text-gray-400">
            {t("dashboard.projectsList.pending")}
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsList;
