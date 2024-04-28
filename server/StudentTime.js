import mongoose  from "mongoose";
const dataSchema = new mongoose.Schema(
    {
        Date: { required: false, type: String },
        Time: { required: false, type: String },
        Class: { required: false, type: String },
        SID:{required:true, type:String},
        isCome: { required: true, type: String },
    }
);
export  const StudentTime = mongoose.model("school/studentTime", dataSchema);