"use client";

import {
	ordersData,
	ordersGrid,
	contextMenuItems,
} from "../../../../public/data/dummy";

import {
	GridComponent,
	ColumnsDirective,
	ColumnDirective,
	Resize,
	Sort,
	ContextMenu,
	Filter,
	Page,
	ExcelExport,
	PdfExport,
	Inject,
	Toolbar,
} from "@syncfusion/ej2-react-grids";
import React, { useEffect, useRef, useState } from "react";

import { Header } from "@/components";
import { useStateContext } from "@/contexts/ContextProvider";
import { cameraGridData, GetCameraData, GetStudentData } from "../../../Connect";

const OrderPage = () => {
    const { activeMenu } = useStateContext();
    const grid = useRef(null);
    const [form, setForm] = useState("none");
	const [base64, setBase64] = useState("");
   const [customersData, setCustomersData] = useState([]);

    useEffect(() => {
		
        
        GetCameraData().then((res) => {
            
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
					style={{color: "black",  margin : "10px"}}
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
                        {cameraGridData.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))}
                    </ColumnsDirective>
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
                }} action="http://localhost:5000/api/addCamera" method="POST"
            >
                
                <input
                    style={{
                        borderBottom: "1px grey solid",
                    }}
                    type="text"
                    placeholder="name"
                    name="name"
                />
                <br></br>
				<input
                    style={{
                        borderBottom: "1px grey solid",
                    }}
                    type="text"
                    placeholder="IP"
                    name="ip"
                />
                <br></br>
                
                <button
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
export default OrderPage;
