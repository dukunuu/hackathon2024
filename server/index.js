import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import AWS from "aws-sdk";
import { Student } from "./Student.js";
import { StudentTime } from "./StudentTime.js";
import mongoose from "mongoose";
import {Camera} from "./Camera.js";

AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-northeast-1",
});
const mongoString = "mongodb://127.0.0.1:27017";
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", async () => {
    console.log("Connect");
});

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
var s3 = new AWS.S3();

app.get("/api/", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/uploadStudent", async (req, res) => {
    console.log("ASdasd");
    const data = req.body;
    const image = data.image;
    if (!image) {
        return;
    }
    fs.writeFile("pic.jpg", image.split(",")[1], "base64", (err) => {});
    setTimeout(() => {
        fs.readFile("pic.jpg", async function (err, data) {
            if (err) {
                throw err;
            }
            const students = await Student.find();
            const params = {
                Bucket: "school-1",
                Key: "test/testingHaku" + students.length +".jpg",
                Body: data,
            };
            s3.putObject(params, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully uploaded data to myBucket/myKey");
                }
            });
        });
    }, 100);
    const student = new Student({
name:data.name,
phone:data.phone,
address:data.address,
oPhone:data.oPhone,
_id:data.id,
picture:data.image,
    });
    student.save();
    res.redirect("http://localhost:3000/customers");
});

app.get("/api/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.get("/api/getStudent", async (req, res) => {
    const id = req.query.id;
    const student = await Student.findById(id);
    res.json([student]);
})
app.get("/api/getStudentTime", async (req, res) => {
    const date = req.query.date;
    const time = req.query.time;
    const classN = req.query.class;
    var student = await StudentTime.find({Date:date, Time:time, Class:classN});
    if(student.length==0){
        var students = await Student.find();
        for(let i=0;i<students.length;i++){
            console.log(date,time,classN,students[i]._id);
            const studentTime = new StudentTime({
                Date:date,
                Time:time,
                Class:classN,
                SID:students[i]._id,
                isCome:"false"
            });
            studentTime.save();
        }
        student = await StudentTime.find({Date:date, Time:time, Class:classN});
    }
    res.json(student);
})

app.post("/api/addCamera", async (req, res) => {
    const data = req.body;
    const camera   = new Camera({
        name:data.name,
        ip:data.ip,
    });

    camera.save();
    res.redirect("http://localhost:3000/orders");
})

app.get("/api/getCameras", async (req, res) => {
    const cameras = await Camera.find();
    res.json(cameras);
})

app.get("/api/getCamera", async (req, res) => {
    const id = req.query.id;
    const camera = await Camera.findById(id);
    res.json([camera]);
})


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


