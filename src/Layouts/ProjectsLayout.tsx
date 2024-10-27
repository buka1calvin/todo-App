import ProjectNav from '../components/bashboard/projects/ProjectNav';
import { Outlet } from 'react-router-dom';

const ProjectsLayout = () => {
  return (
    <section className="flex flex-col w-full h-full py-4 px-2 md:px-7">
      <ProjectNav />
      <div className="flex-grow w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default ProjectsLayout;
