import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

export const getDataFromUser=(request:NextRequest)=>{
    try {
        const token= request.cookies.get("token")?.value || ""
        const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!)
        return decodedToken.id; 
    } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
    }
}