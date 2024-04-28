import Image from "next/image";
import avatar from "./avatar.jpg";
import avatar2 from "./avatar.jpg";
import avatar3 from "./avatar.jpg";
import avatar4 from "./avatar.jpg";

const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
        <Image
            className="rounded-full w-10 h-10"
            src={props.EmployeeImage}
            alt="student"
            width="50"
        />
        <p>{props.Name}</p>
    </div>
);

export const studentGridData = [
    {
        headerText: "Сурагч",
        width: "100",
        template: gridEmployeeProfile,
        textAlign: "Center",
    },
    { field: "Name", headerText: " ", width: "0", textAlign: "Center" },
    {
        field: "Date",
        headerText: "Огноо",
        width: "75",
        textAlign: "Center",
    },
    {
        field: "class",
        headerText: "Анги",
        width: "100",
        textAlign: "Center",
    },

    {
        field: "AUB",
        headerText: "АУБ",
        width: "100",
        format: "yMd",
        textAlign: "Center",
    },

    {
        field: "enter",
        headerText: "ирсэн цаг",
        width: "100",
        textAlign: "Center",
    },
    {
        field: "exit",
        headerText: "явсан цаг",
        width: "100",
        textAlign: "Center",
    },
    {
        field: "ID",
        headerText: "Сурагчийн ID",
        width: "100",
        textAlign: "Center",
    },
];

export const cameraGridData = [
    {
        field:"name",
        headerText: "Нэр",
        width: "100",
        textAlign: "Center",
    },
    {
        field: "ip",
        headerText: "IP",
        width: "75",
        textAlign: "Center",
    }

];
export const studentTimeGridData = [
    { field: "Name", headerText: "Нэр", width: "100", textAlign: "Center" },
    {
        field: "Date",
        headerText: "Огноо",
        width: "75",
        textAlign: "Center",
    },
    {
        field: "class",
        headerText: "Анги",
        width: "100",
        textAlign: "Center",
    },

    {
        field: "Time",
        headerText: "хичээлийн цаг",
        width: "100",
        textAlign: "Center",
    },
    {
        field: "isCome",
        headerText: "Ирсэн эсэх",
        width: "100",
        textAlign: "Center",
    },
    {
        field: "ID",
        headerText: "Сурагчийн ID",
        width: "100",
        textAlign: "Center",
    },
];

export async function GetCameraData() {
    let res = await fetch("http://127.0.0.1:5000/api/getCameras");
    res = await res.json();
    let r = [];
    res.map((i) => {
        r.push({
            name: i.name,
            ip: i.ip,
        });
    });
    return r;
}

export async function GetStudentData() {
    let res = await fetch("http://127.0.0.1:5000/api/students");
    res = await res.json();
    console.log(res);
    let r = [];
    res.map((i) => {
        r.push({
            Name: i.name,
            Phone: i.phone,
            Address: i.address,
            OtherPhone: i.oPhone,
            ID: i._id,
            CustomerImage: i.picture,
        });
    });
    return r;
}

export function GetStudentDayTimeData() {
    return [
        {
            ID: 1,
            Name: "Kujo Jotaro",
            AUB: "Dio Brando",
            Date: "01/02/2021",
            enter: "08:00",
            exit: "14:10",
            class: "stardust",
            EmployeeImage: avatar3,
        },
        {
            ID: 1,
            Name: "Kujo Jotaro",
            AUB: "Dio Brando",
            Date: "01/02/2021",
            enter: "14:30",
            exit: "15:10",
            class: "stardust",
            EmployeeImage: avatar3,
        },
        {
            ID: 1,
            Name: "Kujo Jotaro",
            AUB: "Dio Brando",
            Date: "01/02/2021",
            enter: "16:00",
            exit: "19:10",
            class: "stardust",
            EmployeeImage: avatar3,
        },
    ];
}

export async function GetStudentDayTimeDataApi(date, time, classN) {
    //date replace - to  .
    let res = await fetch(
        "http://127.0.0.1:5000/api/getStudentTime?date=" +
            date +
            "&time=" +
            time +
            "&class=" +
            classN
    );
    res = await res.json();
    let s = [];
    for (let i of res) {
        let st = await fetch("http://127.0.0.1:5000/api/getStudent?id=" + i.SID);
        console.log(st);
        st = await st.json();
        st = st[0]
        const data = {
            Name: st.name,
            Date: i.Date,
            class: i.Class,
            Time: i.Time,
            isCome: i.isCome == "true" ? "Ирсэн" : "",
            ID: i.SID,
        };
        s.push(data);
    }
    return s;
}
