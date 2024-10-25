import React from 'react'
import { useParams } from 'react-router-dom'
import { useTaskContext } from '../../../contexts/TasksProvider'
import { CiUnlock } from "react-icons/ci";
import { RiArrowDownSLine } from "react-icons/ri";
import { useUserContext } from '../../../contexts/UsersContext';
import MultiAvatar from '../../ui/MultiAvatars';
import { FaCirclePlus } from "react-icons/fa6";
import { AiOutlineLink } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import { RiEqualizer2Line } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import NavTasks from '../../ui/Nav';

const ProjectOverView = () => {
    const { id } = useParams();
    const { projects, isLoading, error } = useTaskContext();
    const { users } = useUserContext();

    const project = projects?.find((project) => project.id === Number(id));
    const avatars = project?.tasks
        .map((task) => users?.find((user) => user?.id === task.userId))
        .filter(Boolean)
        .map((user) => ({
            src: user?.image || "",
            alt: user?.firstName || 'User'
        }));

    if (isLoading) return <p>Loading...</p>;
    if (!project) return <p>Project not found.</p>;

    const allTasks=project.tasks.length
    const todoTasks=project.tasks.filter(task=>task.completed===false).length
    const completedTasks=project.tasks.filter(task=>task.completed===true).length
    return (
        <section className='w-full h-full flex flex-col gap-4'>
            <h1 className="font-bold text-3xl mb-4">{project?.name}</h1>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <div className="flex items-center gap-1 text-gray-400">
                        <CiUnlock className='' />
                        <p className="text-sm font-semibold text-gray-700">Limited Access</p>
                        <RiArrowDownSLine className='w-5 h-5 mt-1' />
                    </div>
                    <div className="h-7 w-[2px] rounded-full bg-slate-300"></div>
                    <MultiAvatar avatars={avatars || []} maxAvatars={4} />
                    <FaCirclePlus className='text-primary h-7 w-7' />
                </div>
                <div className="flex items-center justify-center gap-3">
                    <AiOutlineLink className='text-primary w-5 h-5' />
                    <div className="h-5 w-[2px] rounded-full bg-slate-300"></div>
                    <FaEquals className='p-1 bg-primary text-white w-5 h-5 rounded' />
                    <RiDashboardLine className='text-primary w-5 h-5' />
                </div>
            </div>
            <div className="flex justify-between items-center text-gray-500 bg-white h-14 rounded-xl text-sm px-4">
                <div className="flex font-medium gap-4">
                <NavTasks name='All Tasks' count={allTasks}/>
                <NavTasks name='Todo/In Progress' count={todoTasks}/>
                <NavTasks name='completed' count={completedTasks}/>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center justify-center border px-3">
                        <RiEqualizer2Line/>
                        <p className="">Filter & Sort</p>
                    </div>
                    <button className="flex py-1 px-3 rounded border items-center gap-1">
                        <FaPlus/>
                        New Task
                    </button>
                </div>
            </div>
            <div className="">
                {
                    project.tasks.map((task)=>(
                        <></>
                    ))
                }
            </div>
        </section>
    );
};



export default ProjectOverView
