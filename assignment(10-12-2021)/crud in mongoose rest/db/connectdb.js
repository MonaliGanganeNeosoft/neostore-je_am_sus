import mongoose from 'mongoose';
const connectDB = async (Database_Url)=>{
    try{
        const Db_Options = {
            dbName:"school",
        };
        await mongoose.connect(Database_Url,Db_Options);
        console.log("connected sucess")
    }catch(err){
        console.log(err);
    }
};
export default connectDB;