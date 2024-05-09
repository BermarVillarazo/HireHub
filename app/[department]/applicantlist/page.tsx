// @ts-ignore
"use client";

import { department } from "@/lib/schema";
import { useState } from "react";

export default function Requests() {
    const sampleRequests = [
        {
            id: 1,
            name: "Yankee Caburnay",
            email: "example@gmail.com",
            position: "Faculty",
            phone: "09123456789",
            communication: "Phone number",
            department: "CCS",
            date: "applied x days ago",
        },
        {
            id: 2,
            name: "Gieb Gwapo",
            email: "example@gmail.com",
            position: "Admin",
            phone: "09123456789",
            communication: "Email",
            department: "Accounting",
            date: "applied x days ago",
        },
        {
            id: 3,
            name: "Kimberly Inting",
            email: "example@gmail.com",
            position: "HR head",
            phone: "09123456789",
            communication: "Phone number",
            department: "HR",
            date: "applied x days ago",
        },
        {
            id: 4,
            name: "Pettes",
            email: "example@gmailcom",
            position: "HR head",
            phone: "09123456789",
            communication: "Email",
            department: "HR",
            date: "applied x days ago",
        },
        {
            id: 5,
            name: "John Doe",
            email: "example@gmail.com",
            position: "HR head",
            phone: "09123456789",
            communication: "Phone number",
            department: "HR",
            date: "applied x days ago",
        },
    ];

    const [selectedID, setSelectedID] = useState(0);
    const [requestData, setRequestData] = useState({});

    const handleDetails = (id: number) => () => {
        setSelectedID(id);
        const selectedRequest = sampleRequests.find((request) => request.id === id);
        setRequestData(selectedRequest || {});
    };

    const handleNewRequest = () => {
        // Implement the functionality for submitting a new request
    };

    return (
        <section className="w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row">
        <section className="w-full sm:w-1/2 p-4 sm:p-6 bg-gray-200 overflow-auto">
            <h1 className="text-3xl font-bold">CANDIDATES LIST</h1>
                {sampleRequests.map(({ id, name, email, position, phone, communication, department, date, }) => (
                    <RequestItem
                        key={id}
                        id={id}
                        title={name}
                        position={position}
                        date={date}
                        handleDetails={handleDetails}
                    />
                ))}
            </section>

            <section className="w-full sm:w-1/2 p-4 sm:p-6 bg-gray-200">
                <h1 className="text-3xl font-bold">CANDIDATES INFORMATION</h1>
                <section className="details-section mt-6 p-4 sm:p-10 bg-amber-500 rounded-lg text-white">
                    <section className="flex items-center gap-8">
                        <div className="bg-gray-300 h-32 w-32 rounded-full overflow-hidden flex-shrink-0"></div>
                        <div>
                            <h1 className="text-5xl font-bold">
                        
                            </h1>
                            
                        </div>
                    </section>
                    <div className="mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="grid w-full max-w-xs items-center gap-2">
                            <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email Address
                            </label>
                            <p className="flex mb-2 h-10 w-full rounded-md border border-input text-black bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                               
                            </p>
                        </div>
                        <div className="grid w-full max-w-xs items-center gap-2">
                            <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Contact Number
                            </label>
                            <p className="flex mb-2 h-10 w-full rounded-md border border-input text-black bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                              
                            </p>
                        </div>
                        <div className="grid w-full max-w-xs items-center gap-2">
                            <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Preferred mode of communication
                            </label>
                            <p className="flex mb-2 h-10 w-full rounded-md border border-input text-black bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                               
                            </p>
                        </div>
                        <div className="grid w-full max-w-xs items-center gap-2">
                            <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Department
                            </label>
                            <p className="flex mb-2 h-10 w-full rounded-md border border-input text-black bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                               
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button className="bg-red-900 w-40 hover:bg-red-800 text-white font-semibold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap">
                            UPDATE STATUS
                        </button>
                        <button className="bg-red-900 w-40 hover:bg-red-800 text-white font-semibold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap">
                            SEND EMAIL
                        </button>
                    </div>
                    <div className=" mt-10 items-center justify-between">
                        <h1 className="font-bold mb-2"> APPLICATION STATUS </h1>
                        <div className="bg-red-800 h-6 w-1/2 rounded-full"></div>
                    </div>
                </section>
                </section>
            </section>
    );
}

function RequestItem({
    id,
    title,
    position,
    date,
    handleDetails,
}: {
    id: number;
    title: string;
    position: string;
    date: string;
    handleDetails: (id: number) => () => void;
}) {
    return (
        <div
            key={id}
            className="w-full bg-amber-500 hover:scale-105 hover:text-white hover:bg-red-900 rounded-lg my-6 p-8 cursor-pointer"
            onClick={handleDetails(id)}
        >
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-md">{position}</p>
            <p className="text-md">{date}</p>
        </div>
    );
}
