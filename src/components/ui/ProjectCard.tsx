import React from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const defaultAvatar = "https://dummyjson.com/image/150"; // Placeholder image URL for projects without images

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { name, tasks, description, imageUrl, status,id } = project;

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 w-full p-4 border border-gray-200">
      <figure className="w-full">
        <img
          src={imageUrl || defaultAvatar} // Use default avatar if no image is provided
          alt={name}
          className="w-full h-40 object-cover" // Standardized height and full width
        />
      </figure>
      <div className="pt-4">
        <h2 className="text-base font-semibold text-gray-700">{name}</h2>
        <p className="text-sm text-gray-500 mt-1 text-pretty">
          {description || "No description available"}
        </p>
        <div className="flex justify-between ">
          <p className="text-sm text-gray-500 mt-2">Tasks: {tasks.length}</p>
          <p className="text-sm text-gray-500 mt-2">
            Status:{"  "}
            <span className="bg-gray-300 text-gray-600 font-medium p-1">
              {status || "Unknown"}
            </span>
          </p>
        </div>
        <div className="flex justify-start mt-4">
          <button className="bg-primary text-white text-sm py-1 px-3 hover:bg-gray-800 transition-colors duration-150">
            <Link to={`/dashboard/projects/${id}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
