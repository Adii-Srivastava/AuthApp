import mongoose from "mongoose";

export default function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("MongoDb connected Successfully")
        })

    } catch (error) {
        console.log("Something goes wrong")
        console.log(error)
    }
}