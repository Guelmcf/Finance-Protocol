"use client"

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    
    const router = useRouter();

    async function handleLogout() {
        await createClient().auth.signOut();
        router.push("/login");
    }

    return(
        <div>
            <h1>funcionou</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )   
}