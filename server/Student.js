import mongoose  from "mongoose";
const dataSchema = new mongoose.Schema(
    {
        _id: { required: true, type: String },
        name: { required: true, type: String },
        phone: { required: true, type: String },
        address:{required:true, type:String},
        oPhone:{required:true, type:String},
        picture:{required:true, type:String}
    }
);
export  const Student = mongoose.model("school/student", dataSchema);