import { LayoutDashboard, User, LibraryBig, LogOut, CalendarClock, DiamondPlus  } from 'lucide-react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const Sidebar = () => {
    const AdminLinks=[
        {
            title:'Dashboard',
            link:'/dashboard',
            icon:LayoutDashboard
        },
        {
            title:'Teachers',
            link:'/user',
            icon:User
        },
        {
            title:'Subjects',
            link:'/adsub',
            icon:LibraryBig 
        },
        {
            title:'Generate TimeTable',
            link:'/user',
            icon:DiamondPlus
        },
    ]
    return (
        <div className='h-[96vh] mt-[2vh] ml-[2vh] w-1/6 flex  justify-center items-center flex-col bg-secondary rounded-xl pt-8 '>
             <div className="w-full flex flex-col  mb-8 ">
        <div className="flex items-center gap-2 text-primary text-2xl font-bold ">
          <CalendarClock size={24} />
          <span>Time Table Generator</span>
        </div>
      </div>
            <div className='h-5/6 w-full flex flex-col justify-start items-center gap-4'>
            {
          AdminLinks.map((links, index) => (
            
              <NavLink to={links.link} className='p-5 border-b-4 border-gray-500 hover:border-primary font-bold mt-2 w-full'>
              <span className='flex flex-row items-center justify-start h-full w-full gap-2  hover-text '>
                                {React.createElement(links.icon, { size: 20 })}
                                {links.title}
                </span>
              </NavLink>
            
          ))
        }
            </div>
            <div className='h-1/6 w-full flex flex-col justify-center items-center'>
        <NavLink 
          to="/login"
          className='list-none w-[90%] flex items-center gap-3 px-3 py-4 text-black dark:text-white font-mono text-[130%] hover:border hover:border-stone-950 hover:dark:border-stone-100 hover:rounded-xl'
          >
          <LogOut/>
          <span>Logout</span>
        </NavLink>
      </div>

        </div>
    )
}

export default Sidebar