import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        title:{type:String, required:true},
        description:String,
        completed:{type:Boolean, default:false},
    },
    {timestamp:true}
);

export default mongoose.model("Task",taskSchema);