import React, { memo } from 'react'
import Image from 'next/image'
import { NavbarProps } from '@/types/type'
import ActiveUsers from './users/ActiveUsers' // Import the ActiveUsers component

const Navbar = ({activeElement} : NavbarProps) => {
  return (
    <nav className='flex select-none items-center justify-between  bg-primary-black px-5 text-white'>
        <Image src="/assets/logo.svg" alt="Logo" width={100} height={30}/>
        <ActiveUsers />
    </nav>
  )
}

export default memo(Navbar , (prevProps, nextProps) => {
    return prevProps.activeElement === nextProps.activeElement
}
)