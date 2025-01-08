import { ThemeProvider } from 'next-themes'
import React from 'react'

export default function Providers({children}) {
  return (
    <ThemeProvider defaultTheme='system' attribute="class">
        <div className='bg-white dark:bg-slate-800 text-black dark:text-white font-montserrat'>
            {children}
        </div>
    </ThemeProvider>
  )
}
