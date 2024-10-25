import React from 'react'
import ProjectNav from '../components/bashboard/projects/ProjectNav'
import { Outlet } from 'react-router-dom'

const ProjectsLayout = () => {
  return (
    <section className='flex flex-col w-full px-7 h-full'>
      <ProjectNav/>
      <Outlet/>
    </section>
  )
}

export default ProjectsLayout
