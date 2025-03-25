"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"




export default function signupPage(){
    const router= useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    // const [buttonDisabled, setButtonDisabled] = React.useState(true)
    
    const onSignup= async()=>{
       try {
        const response=await axios.post("/api/users/signup",user)
        console.log("Signup success",response.data)
        router.push("/login")
        
       } catch (error:any) {
        console.log("Signup failed", error.message)
        toast.error(error.message)
       }
    }

    // React.useEffect(()=>{
    //    if(user.email.length>0 && user.username.length>0 && user.password.length>0){
    //     setButtonDisabled(false);
    //    }else{
    //     setButtonDisabled(true);
    //    }
    // }, [user])


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          {/* <h1>Singup</h1> */}
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <label htmlFor="username">Username</label>
          <hr />
          <input className="bg-white text-black p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
           type="text"
           id="username"
           value={user.username}
           placeholder="Enter your username"
           onChange={(e)=> setUser({...user, username:e.target.value})} />
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
           onClick={onSignup}
           className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:cursor-pointer">Signup</button>
           <h3 className="text-blue-600 hover:cursor-pointer ">Already have an account?<span className="text-white mx-2"><Link href="/login">Login</Link></span></h3>
           
           </div>
        </div>
    )
}