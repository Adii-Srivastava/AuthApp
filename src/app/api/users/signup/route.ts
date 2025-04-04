import connect from "@/dbConfig/dbConfig"
import User from "@/models/usermodels"
import { NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";


export async function POST(request:NextRequest){
    try {
         const reqBody = await request.json()
         const{username, email, password}=reqBody 

        const user= await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exist"},{status:400})

        }

        const salt= await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

        const newUser= new User({
            username,
            email,
            password:hashedPassword
        })

        await newUser.save()

        return NextResponse.json({
            message:"User created Successfully",
            success:true,
            newUser
        })


    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
    
}


connect();