"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleRegister() {
    try{
        const { data, error } = await createClient().auth.signUp({ email, password });
        console.log("data:", data);
        console.log("error:", error);
        router.push("/dashboard");
    } catch (error) {
        console.error("Error registering:", error);
    }
}

    return (
        <div>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
            }}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}