"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const [passSee, setPassSee] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email)

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
    function validateEmail() {
        if (isValid) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }

    function handleChange() {
        setPassSee(!passSee);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-violet-900 to-gray-800">
            <div className="backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl w-150 h-190">
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                    }} className="flex items-center justify-center h-full flex-col gap-10">
                    <div className="flex items-center justify-center h-25 w-25 text-center bg-white/30 rounded-3xl mt-10 text-4xl mb-"><CiLogin /></div>
                    <h1 className="text-center text-white text-2xl font-bold">Sign up with your email and take control of you finances <span className="text-violet-500 text-bold">now</span></h1>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="
                        flex items-center justify-center text-center
                        backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl h-12 w-105
                        hover:bg-white/20 transition-colors duration-300
                        active:bg-white/30"
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        className="
                        flex items-center justify-center text-center
                        backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl h-12 w-105
                        hover:bg-white/20 transition-colors duration-300
                        active:bg-white/30"
                    />
                    {!isEmailValid && <p className="text-red-500 text-sm ">Please enter a valid email address.</p>}
                    <div className="relative flex items-center">
                        <input
                        type={passSee ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                        flex items-center justify-center text-center
                        backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl h-12 w-105
                        hover:bg-white/20 transition-colors duration-300
                        active:bg-white/30"
                    />
                        <button onClick={handleChange} type="button" 
                        className="bg-white/10 border border-white/30 rounded-full h-10 w-10 absolute right-2 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 active:bg-white/30">
                        {passSee ? <FaEye className="text-gray-400" /> : <FaEyeSlash className="text-gray-400" />}
                        </button>
                    </div>
                    <div className="relative flex items-center">
                        <input
                        type={passSee ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="
                        flex items-center justify-center text-center
                        backdrop-blur-sm bg-white/10 border border-white/30 rounded-2xl h-12 w-105
                        hover:bg-white/20 transition-colors duration-300
                        active:bg-white/30"
                    />
                        <button onClick={handleChange} type="button" 
                        className="bg-white/10 border border-white/30 rounded-full h-10 w-10 absolute right-2 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 active:bg-white/30">
                        {passSee ? <FaEye className="text-gray-400" /> : <FaEyeSlash className="text-gray-400" />}
                        </button>
                    </div>
                    <button type="submit"
                    className="
                    flex items-center justify-center text-center text-white font-semibold
                    bg-violet-600 border border-violet-500 rounded-2xl h-12 w-105
                    hover:bg-violet-850 transition-colors duration-300
                    active:bg-violet-800"
                    >Register</button>
                    <h3 className="flex items-center justify-center text-center mt-5 mb-5">Already a member? 
                    <a href="/login" className="ml-2 underline hover:text-violet-800">Sign in    now</a>
                    </h3>
                </form>
            </div>
        </div>
    );
}