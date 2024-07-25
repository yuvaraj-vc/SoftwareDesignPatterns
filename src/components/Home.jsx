import React from 'react'
import BlurFade from './magicui/blur-fade'

const Home = () => {
  return (
   
    <div className='h-full w-full flex justify-center items-center'>
      <BlurFade  delay={0.25 } inView>
      Home
     </BlurFade>
    </div>
    
  )
}

export default Home