"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { NextResponse } from "next/server"




export default function LoginPage(){
    const router= useRouter();

    const [user, setUser] = React.useState({
        email:"",
        password:"",
        
    })
    
    const onlogin= async()=>{
        try {
            const response=await axios.post("/api/users/login",user);
            console.log("login success",response.data)
            toast.success("Login success")
            router.push("/profile")
        } catch (error: unknown) {
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
        
    
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          {/* <h1>Singup</h1> */}
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
          
          <label htmlFor="email">Email</label>
          <hr />
          <input className="bg-white text-black p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
           type="text"
           id="email"
           value={user.email}
           placeholder="Enter your email"
           onChange={(e)=> setUser({...user, email:e.target.value})} />
          <label htmlFor="password">Password</label>
          <hr />
          <input className="bg-white text-black p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
           type="password"
           id="password"
           value={user.password}
           placeholder="password"
           onChange={(e)=> setUser({...user, password:e.target.value})} />
           <button
           onClick={onlogin}
           className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:cursor-pointer">login</button>
           <h3 className="text-blue-600 hover:cursor-pointer ">Didn&apos;t have an account?<span className="text-white mx-2"><Link href="/signup">Signup</Link></span></h3>
           
           </div>
        </div>
    )
}