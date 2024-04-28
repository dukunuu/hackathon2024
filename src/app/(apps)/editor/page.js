"use client";
import React, { useState } from "react";
import { useStateContext } from "@/contexts/ContextProvider";

import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Inject,
    Search,
    Toolbar,
    Sort,
} from "@syncfusion/ej2-react-grids";

import { Header } from "@/components";

import {  GetStudentDayTimeDataApi, studentTimeGridData } from "../../../Connect";

const EditorPage = () => {
    const { activeMenu } = useStateContext();
	const [data, setData] = useState([]);
    return (
        <div className={activeMenu ? " md:ml-72 " : " w-full flex-2"}>
            <div className="m-2 md:m-10 py-4 px-2 md:p-10 bg-white rounded-3xl dark:text-gray-200 dark:bg-secondary-dark-bg">
                <Header title={"Сурагчдын цагийн хуваарь"} category={""} />
				<div>
                <input type="date" name="date"></input>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<label>Time</label>
                <select name="time" id="time">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<label>Class</label>
				<select name="class" id="class">
                    <option value="101">101</option>
                    <option value="102">102</option>
                    <option value="103">103</option>
                    <option value="104">104</option>
                </select>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button onClick={() => {
					const d = {
						date: document.querySelector("input[name='date']").value,
						time: document.querySelector("select[name='time']").value,
						class: document.querySelector("select[name='class']").value,
					}
					GetStudentDayTimeDataApi(d.date, d.time, d.class).then(res => {
						setData(res)
					})
				}}>Харах</button>
				</div>
                <GridComponent
                    dataSource={data}
                    allowPaging
                    allowSorting
                    toolbar={["Search"]}
                    width={"auto"}
                >
                    <ColumnsDirective>
                        {studentTimeGridData.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))}
                    </ColumnsDirective>
                    <Inject services={[Page, Search, Toolbar, Sort]} />
                </GridComponent>
            </div>
        </div>
    );
};

export default EditorPage;

