import React from 'react'

const Sidebar = () => {
    return (
        <div className='h-screen w-1/6 flex justify-center items-center flex-col bg-green-500/20 pt-10'>
            <div className='h-5/6 w-full flex flex-col justify-start items-center'>
                links
            </div>
            <div className='h-1/6 w-full flex flex-col justify-center items-center'>
                logout
            </div>

        </div>
    )
}

export default Sidebar