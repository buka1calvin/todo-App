import React, { useState } from "react";
import { useTaskContext } from "../../../contexts/TasksProvider";
import ProjectCard from "../../ui/ProjectCard";
import useSearch from "../../../hooks/useSearch";
import { MoonLoader } from "react-spinners";

const ProjectsList = () => {
  const { projects, isLoading, error } = useTaskContext();
  const [filterByStatus, setFilterByStatus] = useState<string>(""); // Optional: To filter by status
  const { query, handleSearch, filteredData } = useSearch(projects || [], {
    fields: ["name", "description"], // Search by project name or description
  });
  console.log("projects===",projects)
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
    return <p>Error loading projects: {error.toString()}</p>;
  }

  return (
    <section className="p-4 relative">
      {/* Search Bar */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-r from-green-400 to-secondary rounded-full blur-3xl opacity-70"></div>
      <div className="">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={handleSearch}
            className="input input-bordered w-full"
          />
        </div>

        {/* Optional: Filter by Status */}
        <div className="mb-4">
          <select
            value={filterByStatus}
            onChange={handleStatusFilter}
            className="select select-bordered w-full"
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsList;
