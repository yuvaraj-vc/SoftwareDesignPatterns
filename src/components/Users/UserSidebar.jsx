import { LayoutDashboard, User, LibraryBig, LogOut  } from 'lucide-react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const UserSidebar = () => {
    const AdminLinks=[
        {
            title:'Dashboard',
            link:'/userdashboard',
            icon:LayoutDashboard
        },
        {
            title:'Subjects',
            link:'/sub',
            icon:User
        },
        {
            title:'Classes',
            link:'/class',
            icon:LibraryBig 
        },
    ]
    return (
        <div className='h-screen w-1/6 flex  justify-center items-center flex-col bg-secondary opacity-70 pt-10 shadow-sm shadow-primary '>
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

export default UserSidebar