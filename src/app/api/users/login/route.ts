import connect from "@/dbConfig/dbConfig"
import User from "@/models/usermodels"
import { NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



connect();

export async function POST(request:NextRequest){

    try {
        const reqBody= await request.json()
        const {email, password}= reqBody;

       const user= await User.findOne({email})
       if(!user){
        return NextResponse.json({message:"User not exist"},{status:400})
       }

       //check the password
       const validPassword= await bcryptjs.compare(password, user.password)
       if(!validPassword){
        console.log("Password wrong")
        return NextResponse.json({error:"Invalid Password"},{status:400})
        
       }

       const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
       }

       const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

       const response= NextResponse.json({
        message:"Login Successfull",
        success:true,
       })

       response.cookies.set("token",token,{
        httpOnly:true,
        
       })

       return response;



        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
    
}