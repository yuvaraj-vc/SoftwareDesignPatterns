
import BlurFade from '@/components/magicui/blur-fade'
import UserSidebar from '@/components/Users/UserSidebar'
import UserTopbar from '@/components/Users/UserTopBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='h-screen w-screen overflow-x-hidden top-0 m-0 p-0 flex flex-row overflow-y-auto '>
    <UserSidebar />
    <div className='h-screen w-5/6 flex justify-center items-center flex-col'>
     <UserTopbar/>
     <div className='h-[92vh] w-full flex flex-col items-center justify-center'>
     

     <Outlet/>
     
     </div>

    </div>

    
</div>
  )
}

export default UserLayout