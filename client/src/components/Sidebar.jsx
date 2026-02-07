import React from 'react'
import {
    MdDashboard,
    MdTaskAlt,
    MdSettings,
    MdOutlinePendingActions,
    MdOutlineAddTask,
} from "react-icons/md";

import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';

const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard />,
    },
    {
        label: "Task",
        link: "task",
        icon: <FaTasks />,
    },
    {
        label: "Completed",
        link: "completed/completed",
        icon: <MdTaskAlt />,
    },
    {
        label: "In Progress",
        link: "in-progress/in-progress",
        icon: <MdOutlinePendingActions />,
    },
    {
        label: "To Do",
        link: "todo/todo",
        icon: <MdSettings />,
    },
    {
        label: "Team",
        link: "team",
        icon: <FaUsers />,
    },
    {
        label: "Trash",
        link: "trash",
        icon: <FaTrashAlt />,
    }
]
const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch()
    const location = useLocation()
    const path = location.pathname.split("/")[1];
    
    const sidebarLinks = user?.data?.isAdmin ? linkData : linkData.slice(0, 5);

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    }

    const NavLink = ({el}) => {
        return (
            <Link
                to={el.link}
                onClick={closeSidebar}
                className={clsx(
                    "w-full lg:w-3/4 flex gap-2 text-2xl px-3 py-2 rounded-full items-center text-gray-800  hover:bg-[#2564ed2d] side-link-pad",
                    path === el?.link?.split("/")[0] ? "bg-blue-700 text-white" : ""
                )}
            >
                {el.icon}
                <span className=' hover:text-[#2564ed]'>{el.label}</span>
            </Link>
        );
    };

    return (
        <div className='w-full h-full flex flex-col gap-20 sidebar-padding'>
            <h1 className='flex flex-gap-2 items-center'>
                <p className='bg-blue-600 p-2 rounded-full w-12 h-12 flex justify-center items-center'>
                    <MdOutlineAddTask className='text-white text-4xl font-bold' />
                </p>
                <span className='text-3xl font-bold text-black'>TaskMe</span>
            </h1>
            <div className='flex-1 flex flex-col gap-y-8 py-8'>
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>
            <div className=''>
                <button className='w-full flex gap-2 p-2 items-center text-2xl text-gray-800'>
                    <MdSettings />
                    <span>Settings</span>
                </button>
            </div>

        </div>
    )
}

export default Sidebar