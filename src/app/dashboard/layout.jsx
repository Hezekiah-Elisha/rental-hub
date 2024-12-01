import SideNav from '@/components/SideNav'
import React from 'react'

export default function layout({ children }) {
  return (
    <div className='flex flex-row'>
        <SideNav />
        <div className="p-5">
            {children}
        </div>
    </div>
  )
}
