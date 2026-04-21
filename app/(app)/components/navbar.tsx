"use client"

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { MdDashboardCustomize } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { LuPanelLeftOpen } from "react-icons/lu";
import { LuPanelRightOpen } from "react-icons/lu";
import { FaFlagCheckered } from "react-icons/fa";


export default function Navbar({ isShrunken, toggleSidebar }: { isShrunken: boolean, toggleSidebar: () => void }) {

    const router = useRouter();

    async function handleLogout() {
        await createClient().auth.signOut();
        router.push("/login");
    }

  return (
    <nav className="bg-gray-800 text-white p-4 h-full">
      <div className={"mx-auto flex flex-col justify-between h-full" + (isShrunken ? " items-center" : " items-start")}>
        <div>
          <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-bold">{isShrunken ?  "" : "Finance Protocol"}</h1>
        <button onClick={toggleSidebar} className="p-4" 
        >{isShrunken ? <LuPanelLeftOpen size={24} /> : <LuPanelRightOpen size={24} />}
        </button>
          </div>
          {!isShrunken && <hr />}
        <div className={"flex flex-col justify-between mt-4 gap-2 " + (isShrunken ? " items-center" : " items-start")}>
          <a href="/dashboard" className="px-3 py-2 rounded hover:bg-gray-700">
            {isShrunken ? <MdDashboardCustomize size={24} /> : "Dashboard"}
          </a>  
          <a href="/transactions" className="px-3 py-2 rounded hover:bg-gray-700">
            {isShrunken ? <GrTransaction size={24} /> : "Transactions"}
          </a>
          <a href="/goals" className="px-3 py-2 rounded hover:bg-gray-700">
            {isShrunken ? <FaFlagCheckered  size={24} /> : "Goals"}
          </a>
          <a href="/settings" className="px-3 py-2 rounded hover:bg-gray-700">
            {isShrunken ? <IoMdSettings size={24} /> : "Settings"}
          </a>
        </div>
        </div>
          <button onClick={handleLogout} className="px-3 py-2 rounded hover:bg-gray-700 flex flex-col items-center justify-end">
          {isShrunken ? <TbLogout2 size={24} /> : <span className="font-bold">Logout</span>}
        </button>
      </div>
    </nav>
  );
}