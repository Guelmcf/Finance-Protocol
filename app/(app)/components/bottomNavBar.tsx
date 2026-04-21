"use client"

import { MdDashboardCustomize } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { FaFlagCheckered } from "react-icons/fa";

export default function BottomNavBar() {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex flex-row justify-around md:hidden">
            <a href="/dashboard" className="px-3 py-2 rounded hover:bg-gray-700">
                <MdDashboardCustomize size={24} />
            </a>
            <a href="/transactions" className="px-3 py-2 rounded hover:bg-gray-700">
                <GrTransaction size={24} />
            </a>
            <a href="/goals" className="px-3 py-2 rounded hover:bg-gray-700">
                <FaFlagCheckered size={24} />
            </a>
            <a href="/settings" className="px-3 py-2 rounded hover:bg-gray-700">
                <IoMdSettings size={24} />
            </a>
        </nav>
    )
}