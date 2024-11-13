import MobileNav from '@/Components/shared/MobileNav'
import Sidebar from '@/Components/shared/Sidebar'
import React from 'react'

const Layout = ({ children }: {children:React.ReactNode}) => {
  return (
    <main className='root'>
    <Sidebar />
    <MobileNav />


        <div className='root-container'>
            <div className='wrapper'>
            {children}
            </div>
        </div>
    </main>
  )
}

export default Layout