"use client"
import axios from "axios";
// import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { NextResponse } from "next/server";

export default function ProfilePage(){
    const router= useRouter();
    // const [data, setData] = useState("nothing")
     const logout=async()=>{
          try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
          } catch (error: unknown) {
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
        
     }

    //  const getUserDetail= async()=>{
    //     const res=await axios.get('/api/users/me')
    //     console.log(res.data)
    //     // setData(res.data.data._id)
    //  }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           
            <h1>Hey User welcome to your profile page</h1>
            
            <hr />
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={logout}>Logout</button>
            

        </div>
    )
}