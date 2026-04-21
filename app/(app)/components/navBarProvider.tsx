"use client"

import { useState } from "react"
import Navbar from "./navbar"
import BottomNavBar from "./bottomNavBar"

export const NavBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShrunken , setIsShrunken] = useState(true)

  const toggleSidebar = () => {
    setIsShrunken(!isShrunken)
  }

  return (
    <div className="flex">
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform hidden md:block ${isShrunken ? "w-16" : "w-64"}`}>
        <Navbar isShrunken={isShrunken} toggleSidebar={toggleSidebar} />
      </div>
      <div className="md:hidden">
        <BottomNavBar />
      </div>
      <div className="flex-1 ml-0 md:ml-64">
        {children}
      </div>
    </div>
  )
}