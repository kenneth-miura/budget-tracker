import {connect} from "mongoose";

export async function connectToDatabase(){
    if(!process.env.MONGODB_URI){
        throw new Error('MONGODB_URI is not set');
    }
    return await connect(process.env.MONGODB_URI);
}
