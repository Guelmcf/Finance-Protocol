"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [passSee, setPassSee] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email)

    function validateEmail() {
        if (isValid) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }

    async function handleLogin() {
        try{
            await createClient().auth.signInWithPassword({ email, password });
            router.push("/dashboard");

        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    function handleChange() {
        setPassSee(!passSee);
    }


    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-violet-900 to-gray-800">
            <div className="backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl w-150 h-160">
                <form className="flex items-center justify-center h-full flex-col gap-10"
                action="" onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}>
                <div className="flex items-center justify-center h-25 w-25 text-center bg-white/30 rounded-3xl mt-10 text-4xl mb-"><CiLogin /></div>
                <h1 className="text-center text-white text-2xl font-bold">Sign in with your email and take control of you finances <span className="text-violet-500 text-bold">now</span></h1>
                <div className="flex flex-col items-center gap-4 flex-1 justify-center">
                <input
                    className="
                    flex items-center justify-center text-center
                    backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl h-12 w-105
                    hover:bg-white/20 transition-colors duration-300
                    active:bg-white/30"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                />
                {!isEmailValid && <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>}
                <div className="relative flex items-center">
                <input
                    className="
                    flex items-center justify-center text-center
                    backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl h-12 w-105
                    hover:bg-white/20 transition-colors duration-300
                    active:bg-white/30"
                    type={passSee ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleChange} type="button" 
                className="bg-white/10 border border-white/30 rounded-full h-10 w-10 absolute right-2 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 active:bg-white/30">
                {passSee ? <FaEye className="text-gray-400" /> : <FaEyeSlash className="text-gray-400" />}
                </button>
                </div>
                <a href="/forgot-password" className="underline ml-55 text-2xs hover:text-violet-800">Forgot your password?</a>
                </div>
                <button type="submit"
                className="
                flex items-center justify-center text-center text-white font-semibold
                bg-violet-600 border border-violet-500 rounded-2xl h-12 w-105
                hover:bg-violet-850 transition-colors duration-300
                active:bg-violet-800"
                >Login
                </button>
                <h3 className="flex items-center justify-center text-center mt-5 mb-5">Isn&apos;t a member? 
                <a href="/register" className="ml-2 underline hover:text-violet-800">Sign up now</a>
            </h3>
            </form> 
            </div>
        </div>
    );
}