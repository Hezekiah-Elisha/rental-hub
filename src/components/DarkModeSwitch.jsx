"use client";

import React from 'react'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function DarkModeSwitch() {
    const {theme, setTheme, systemTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const currentTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        setMounted(true);
    }, []);

  return (
    <div className='flex flex-row'>
        {
            mounted && (
                currentTheme === 'dark' ? (
                    <button className='p-2 rounded-md' onClick={() => setTheme('light')}>
                        <SunIcon className='size-6' />
                    </button>
                ) : (
                    <button className='p-2 rounded-md' onClick={() => setTheme('dark')}>
                        <MoonIcon className='size-6' />
                    </button>
                )
            )
        }
    </div>
  )
}
