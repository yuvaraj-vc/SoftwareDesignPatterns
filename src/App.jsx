import React from 'react'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/style.css'
import Signup from './components/Signup'
import Home from './components/Home'
import HomeLayout from './layout/HomeLayout'
import Ripple from './components/magicui/ripple'
import BlurFade from './components/magicui/blur-fade'
import Dashboard from './components/Admin/Dashboard'
import AdminLayout from './layout/AdminLayout'



const App = () => {
  return (
    
    <div className=' relative h-screen w-screen flex items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl'>
     <Ripple/>
      <BlurFade  delay={0.25 } inView>
     <BrowserRouter>
     <Routes>
      
     <Route element={<HomeLayout />}>

                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                    </Route>
     <Route element={<AdminLayout />}>

                        
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Route>
     
                    

     </Routes>
    
    
    
   
     </BrowserRouter>
     </BlurFade>
    </div>
    
  )
}

export default App