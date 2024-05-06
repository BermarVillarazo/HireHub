// @ts-ignore
"use client";

import { useState } from "react";

export default function Requests() {
    const sampleRequests = [
        {
            id: 1,
            name: "Yankee Caburnay",
            position: "Faculty",
            date: "applied x days ago",
        },
        {
            id: 2,
            name: "Gieb Gwapo",
            position: "Admin",
            date: "applied x days ago",
        },
        {
            id: 3,
            name: "Kimberly Inting",
            position: "HR head",
            date: "applied x days ago",
        },
        {
            id: 4,
            name: "Pettes",
            position: "HR head",
            date: "applied x days ago",
        },
        {
            id: 5,
            name: "John Doe",
            position: "HR head",
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
        <section className="w-full h-[90vh] mx-auto py-5 px-36 flex flex-row">
            <section className="w-4/12 p-10 bg-gray-200 overflow-auto">
                <h1 className="text-3xl font-bold">CANDIDATES LIST</h1>
                {sampleRequests.map(({ id, name, position, date }) => (
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

            <section className="w-8/12 p-10 bg-gray-200">
                <h1 className="text-3xl font-bold">CANDIDATES INFORMATION</h1>
                <section className="details-section w-full bg-amber-500 rounded-lg my-6 p-16 text-white flex flex-col gap-y-8 items-center">
                    <section>
                        <h1 className="text-5xl font-bold">
                            {requestData.name || "No Candidate Selected"}
                        </h1>
                        <p className="text-lg">{requestData.position}</p>
                        <p className="text-lg">{requestData.date}</p>
                    </section>
                    <section className="w-8/12 h-25 mx-auto flex justify-center items-center">
                    <section className="w-8/12 p-10 bg-amber-500 flex flex-col justify-center items-center">
                        <button className="w-15 bg-black p-5 px-10 rounded-xl font-semibold text-xl text-white mb-4" onClick={handleNewRequest}>
                            Personal Information
                        </button>
                        <button className="w-25 bg-black p-5 px-10 rounded-xl font-semibold text-xl text-white" onClick={handleNewRequest}>
                            Uploaded Files
                        </button>
                    </section>
                </section>
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
            className="w-full bg-amber-500 rounded-lg my-6 p-8 cursor-pointer "
            onClick={handleDetails(id)}
        >
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-md">{position}</p>
            <p className="text-md">{date}</p>
        </div>
    );
}
