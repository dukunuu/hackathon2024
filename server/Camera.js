import mongoose  from "mongoose";
const dataSchema = new mongoose.Schema(
    {
        name: { required: true, type: String },
        ip: { required: true, type: String },
    }
);
export  const Camera = mongoose.model("school/camera", dataSchema);