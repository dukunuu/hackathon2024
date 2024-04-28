"use client";
import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "@/contexts/ContextProvider";

import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Inject,
    Toolbar,
    Sort,
    Edit,
} from "@syncfusion/ej2-react-grids";

import { Header } from "@/components";

import {  customersGrid } from "../../../../public/data/dummy";
import { GetStudentData } from "../../../Connect";
import { Button } from "@syncfusion/ej2/buttons";

const CustomersPage = () => {
    const { activeMenu } = useStateContext();
    const grid = useRef(null);
    const [form, setForm] = useState("none");
	const [base64, setBase64] = useState("");
   const [customersData, setCustomersData] = useState([]);

    useEffect(() => {
		document.getElementById("image").addEventListener("change", function (event) {
			// 获取选择的文件
			var file = event.target.files[0];
	
			// 创建一个FileReader对象
			var reader = new FileReader();
	
			// 监听FileReader的load事件，读取完成后执行回调函数
			reader.onload = function (event) {
				// 获取base64编码
				var base64 = event.target.result;
				setBase64(base64);
			};
			// 读取文件为base64编码
			reader.readAsDataURL(file);
		});
        
        GetStudentData().then((res) => {
            
            setCustomersData(res);
        });
	}, []);
    return (
        <div className={activeMenu ? " md:ml-72 " : " w-full flex-2"}>
            <div className="m-2 md:m-10 py-4 px-2 md:p-10 bg-white rounded-3xl dark:text-gray-200 dark:bg-secondary-dark-bg">
                <Header title={"Сурагчдын мэдээлэл"} category={""} />
                <button
                    className=" text-white py-2 px-4 rounded-md "
                    onClick={() => setForm("flex")}
                >
                    Add
                </button>
                <GridComponent
                    ref={grid}
                    dataSource={customersData}
                    allowPaging
                    allowSorting
                    width={"auto"}
                    selectionSettings={{ type: "Multiple", mode: "Row" }}
                >
                    <ColumnsDirective>
                        {customersGrid.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))}
                    </ColumnsDirective>
                    <Inject services={[Page, Toolbar, Sort, Edit]} />
                </GridComponent>
            </div>
            <form
                style={{
                    display: form,
                    flexDirection: "column",
                    alignItems: "center",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    position: "fixed",
                    border: "1px solid grey",
                }} action="http://localhost:5000/api/uploadStudent" method="POST"
            >
                <input type="file" id="image" />
                <br></br>
                <input
                    style={{
                        borderBottom: "1px grey solid",
                    }}
                    type="text"
                    placeholder="ID"
                    name="id"
                />
                <br></br>
                <input
                    style={{
                        borderBottom: "1px grey solid",
                    }}
                    type="text"
                    placeholder="Name"
                    name="name"
                />
                <br></br>
                <input
                    style={{
                        borderBottom: "1px grey solid",
                    }}
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                />
                <br></br>
                <input
                    style={{
                        borderBottom: "1px grey solid",
                    }}
                    type="tel"
                    placeholder="Other Phone"
                    name="oPhone"
                />
                <br></br>
                <input
                    style={{
                        borderBottom: "1px grey solid",
                    }}
                    type="text"
                    placeholder="Address"
                    name="address"
                />
				<input type="hidden" name="image" value={base64}></input>
                <br></br>
                <button
                    // onClick={() => {
                    //     const data = {
                    //         image: document.getElementById("im").value,
                    //         name: document.getElementById("name").value,
                    //         phone: document.getElementById("phone").value,
                    //         oPhone: document.getElementById("oPhone").value,
                    //         address: document.getElementById("address").value,
                    //     };
                    //     fetch("http://localhost:5000/api/uploadStudent", {
                    //         method: "POST",
                    //         headers: {
                    //             "Content-Type": "application/json",
                    //         },
                    //         body: JSON.stringify(data),
                    //     });
                    // }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CustomersPage;

