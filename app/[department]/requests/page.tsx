"use client";

import { useState } from "react";

export default function Requests() {
	// fetch requests from the database
	const sampleRequests = [
		{
			id: 1,
			title: "Equipment Purchase Request",
			date: "April 15, 2024",
			type: "Equipment",
			description: "Purchase of laptops and projectors",
			qualifications: "Experience in equipment procurement",
		},
		{
			id: 2,
			title: "Faculty Request",
			date: "March 02, 2024",
			type: "Faculty",
			description: "Faculty for Information Technology",
			qualifications: "PhD in Computer Science",
		},
		{
			id: 3,
			title: "Student Enrollment Request",
			date: "May 20, 2024",
			type: "Student Enrollment",
			description: "Enrollment of new students for the upcoming semester",
			qualifications: "Bachelor's degree in relevant field",
		},
		{
			id: 4,
			title: "Budget Allocation Request",
			date: "June 10, 2024",
			type: "Budget Allocation",
			description: "Request for additional funding for research projects",
			qualifications: "Detailed budget proposal",
		},
		{
			id: 5,
			title: "Training Workshop Request",
			date: "July 05, 2024",
			type: "Training Workshop",
			description: "Request for organizing a workshop on new technologies",
			qualifications: "Experience in organizing workshops",
		},
		// Add more sample requests as needed
	];

	const [selectedID, setSelectedID] = useState(0);
	const [requestData, setRequestData] = useState(
		sampleRequests.find((request) => request.id === 1) || {}
	);

	const handleDetails = (id: number) => () => {
		setSelectedID(id);

		const selectedRequest = sampleRequests.find((request) => request.id === id);
		setRequestData(selectedRequest || {});
	};

	return (
		<section className="w-full h-[90vh] mx-auto py-5 px-36 flex flex-row">
			<section className="w-4/12 p-10 bg-gray-200 overflow-auto">
				<h1 className="text-3xl font-bold">REQUEST LIST</h1>
				{sampleRequests.map(({ id, title, date }) => (
					<RequestItem
						key={id}
						id={id}
						title={title}
						date={date}
						handleDetails={handleDetails}
					/>
				))}
			</section>

			<section className="w-8/12 p-10 bg-gray-200">
				<h1 className="text-3xl font-bold">REQUEST DETAILS</h1>
				<section className="details-section w-full bg-black rounded-lg my-6 p-16 text-white flex flex-col gap-y-8">
					<section>
						<h1 className="text-5xl font-bold">
							{(requestData as { title: string }).title}
						</h1>
						<p className="text-lg">{(requestData as { date: string }).date}</p>
					</section>
					<section>
						<Title title="Type" />
						<p className="text-lg">{(requestData as { type: string }).type}</p>
					</section>
					<section>
						<Title title="Description" />
						<p className="text-lg">
							{(requestData as { description: string }).description}
						</p>
					</section>
					<section>
						<Title title="Qualifications" />
						<p className="text-lg">
							{(requestData as { qualifications: string }).qualifications}
						</p>
					</section>
				</section>
				<section className="flex justify-end">
					<button className="bg-red-900 p-5 px-10 rounded-xl font-semibold text-xl text-white">
						Submit A New Request
					</button>
				</section>
			</section>
		</section>
	);
}

function RequestItem({
	id,
	title,
	date,
	handleDetails,
}: {
	id: number;
	title: string;
	date: string;
	handleDetails: (id: number) => () => void;
}) {
	return (
		<div
			key={id}
			className="w-full bg-amber-500 rounded-lg my-6 p-8"
			onClick={handleDetails(id)}
		>
			<h1 className="text-2xl font-bold">{title}</h1>
			<p className="text-md">Submitted {date}</p>
		</div>
	);
}

function Title({ title }: { title: string }) {
	return <h1 className="text-3xl font-bold">{title}</h1>;
}
