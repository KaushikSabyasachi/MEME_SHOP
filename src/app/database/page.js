import  mongoose from "mongoose";
import process from "process";

const connect = async () =>{
    if(mongoose.connections[0].readyState) return;
    try{
        await mongoose.connect("mongodb://localhost:27017/",{
            // useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Mongo Connection successfully established");
    }
    catch(error){
        throw new Error("Error connecting to Mongoose" + error);
    }

};

export default connect ;
