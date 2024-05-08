"use client";

import { InputProps } from "@/app/types/type";
import { useState } from "react";

const RequestsForm = () => {
    const [selectedOption, setSelectedOption] = useState("requested");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        console.log("TO BE HANDLED...");
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-3/4 h-[80%] bg-black rounded-2xl p-10 text-white"
            >
                <h1 className="text-center font-bold text-4xl text-white mb-8">
                    PERSONNEL REQUEST FORM
                </h1>
                <div className="flex text-white gap-10">
                    <div className="flex flex-col w-2/3">
                        <label className="mb-2 font-bold">Position Requested</label>
                        <Input name="position-requested" placeholder="" />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label className="mb-2 font-bold">Date Requested</label>
                        <Input name="date-requested" placeholder="" />
                    </div>
                </div>
                <div className="mt-5 flex">
                    <label className="text-white mr-6 font-bold">Type</label>
                    <label className="text-white mr-5 flex items-center">
                        <input
                            type="radio"
                            value="new"
                            onChange={(e) => setSelectedOption("new")}
                            className="h-6 w-6 mr-2"
                        />
                        New
                    </label>
                    <label className="text-white mr-5 flex items-center">
                        <input
                            type="radio"
                            value="requested"
                            onChange={(e) => setSelectedOption("requested")}
                            className="h-6 w-6 mr-2"
                        />
                        Requested
                    </label>
                </div>

                <label className="block mt-5 mb-2 font-bold">Description</label>
                <textarea className="w-full h-[25%] text-black p-3 rounded-lg"></textarea>
                <label className="block mt-5 mb-2 font-bold">Qualifications</label>
                <textarea className="w-full h-[25%] text-black p-3 rounded-lg"></textarea>
            </form>
        </div>
    );
};

export default RequestsForm;

export function Input({ name, placeholder = "" }: InputProps) {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            required
            className="block w-full p-3 text-sm text-black border border-gray-300 rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
}
