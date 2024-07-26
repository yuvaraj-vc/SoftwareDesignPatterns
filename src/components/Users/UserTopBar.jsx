import React from 'react'
import { ModeToggle } from '../Toggle'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const UserTopbar = () => {
  return (
    <div className='h-[8vh]  w-full  justify-center bg-secondary opacity-70 items-center top-0 '>
      <div className='w-[90%] flex  justify-end items-end gap-4 pt-4'>

      <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <ModeToggle />
      </div>
    </div>
  )
}

export default UserTopbar