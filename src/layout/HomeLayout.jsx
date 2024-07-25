import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import BlurFade from '../components/magicui/blur-fade'

const HomeLayout = () => {
    return (
        <>
            <div className='h-screen w-screen overflow-hidden overflow-y-auto m-0 p-0'>
                <Navbar />
                

                <Outlet />
                
                <Footer />
            </div>
        </>
    )
}

export default HomeLayout