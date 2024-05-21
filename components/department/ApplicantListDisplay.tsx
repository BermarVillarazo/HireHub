"use client";

import { ApplicantSelect } from "@/lib/schema";
import Link from "next/link";
import { Fragment, useState } from "react";
import LabelInput from "./LabelInput";
import { Title } from "../Title";

const stepsSequence = [
  "Screening",
  "Initial Interview",
  "Teaching Demo",
  "Psychological Exam",
  "Panel Interview",
  "Recommendation for Hiring",
];

export default function ApplicantListDisplay({
  applicant,
}: {
  applicant: ApplicantSelect[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<string>("Screening");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleUpdateStatus = (newStep: string) => {
    setSelectedStep(newStep);
    setIsModalOpen(false);
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStep(event.target.value);
  };

  // Function to determine if a step is before the selected step in the sequence
  const isBeforeSelectedStep = (step: string) => {
    return stepsSequence.indexOf(step) < stepsSequence.indexOf(selectedStep);
  };

  const [selectedID, setSelectedID] = useState(0);
  const [applicantData, setApplicantData] = useState<ApplicantSelect>();

  function handleDetails(id: number) {
    setSelectedID(id);
    const applicantId = applicant.find((applicant) => applicant.id === id);
    setApplicantData(applicantId);
  }

  const handleNewRequest = () => {
    // Implement the functionality for submitting a new request
  };

  console.log(applicant.length);

  return (
    <section className="flex-1 p-5">
      <Title title="CANDIDATES INFORMATION" />
      <section className="w-full bg-amber-500 rounded-lg mt-5 p-12 text-white flex flex-col gap-y-8">
        {}
        {/* {applicant.map(
          ({ id, first_Name, last_Name, email, position, communication }) => (
            <Fragment key={id}>
              <section className="flex items-center gap-5">
                <div className="bg-gray-300 h-24 w-24 rounded-full overflow-hidden"></div>
                <h1 className="text-2xl font-bold">
                  {first_Name} {last_Name}
                </h1>
              </section>
              <div className="grid grid-cols-2 gap-5">
                <LabelInput label="Email" value={email} />
                <LabelInput label="Contact Number" value={communication} />
                <LabelInput
                  label="Preferred Communication Type"
                  value={email}
                />
                <LabelInput
                  label="Applied as"
                  value={`${position === "teachingStaff" && "Teaching Staff"}`}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button className="bg-red-900 w-40 hover:bg-red-800 text-white font-semibold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap">
                  UPDATE STATUS
                </button>
                <Link
                  href={`mailto:${email}`}
                  className="bg-red-900 w-40 hover:bg-red-800 text-white font-semibold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap"
                >
                  SEND EMAIL
                </Link>
              </div>
            </Fragment>
          )
        )} */}

        {/* <div className="w-full items-center justify-between">
                        <h1 className="font-bold"> APPLICATION STATUS </h1>

                        <section className="flex w-full h-52 text-white text-balance relative overflow-hidden">
                            <button className="absolute top-4 right-4" onClick={toggleModal}>
                                <Image src={edit} alt="Edit" className="h-6 w-6" />
                            </button>

                            <div className="flex mt-14 justify-center">
                                <ul className="steps steps-vertical lg:steps-horizontal">
                                    {stepsSequence.map((step) => (
                                        <li
                                            key={step}
                                            className={`step ${
                                                selectedStep === step ? "step-primary" : ""
                                            } ${isBeforeSelectedStep(step) ? "step-primary" : ""}`}
                                        >
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        <Transition appear show={isModalOpen} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-10 overflow-y-auto"
                                onClose={toggleModal}
                            >
                                <div className="flex items-center justify-center min-h-screen px-4 text-center">
                                    <div className="fixed inset-0 bg-black opacity-30"></div>
                                    <span
                                        className="inline-block h-screen align-middle"
                                        aria-hidden="true"
                                    >
                                        &#8203;
                                    </span>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Update Status
                                            </Dialog.Title>
                                            <div className="mt-4">
                                                <div className="flex flex-col">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="status"
                                                            value="Screening"
                                                            checked={selectedStep === "Screening"}
                                                            onChange={handleStepChange}
                                                        />
                                                        <span className="ml-2">Screening</span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="status"
                                                            value="Initial Interview"
                                                            checked={
                                                                selectedStep === "Initial Interview"
                                                            }
                                                            onChange={handleStepChange}
                                                        />
                                                        <span className="ml-2">
                                                            Initial Interview
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="status"
                                                            value="Teaching Demo"
                                                            checked={
                                                                selectedStep === "Teaching Demo"
                                                            }
                                                            onChange={handleStepChange}
                                                        />
                                                        <span className="ml-2">Teaching Demo</span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="status"
                                                            value="Psychological Exam"
                                                            checked={
                                                                selectedStep ===
                                                                "Psychological Exam"
                                                            }
                                                            onChange={handleStepChange}
                                                        />
                                                        <span className="ml-2">
                                                            Psychological Exam
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="status"
                                                            value="Panel Interview"
                                                            checked={
                                                                selectedStep === "Panel Interview"
                                                            }
                                                            onChange={handleStepChange}
                                                        />
                                                        <span className="ml-2">
                                                            Panel Interview
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="status"
                                                            value="Recommendation for Hiring"
                                                            checked={
                                                                selectedStep ===
                                                                "Recommendation for Hiring"
                                                            }
                                                            onChange={handleStepChange}
                                                        />
                                                        <span className="ml-2">
                                                            Recommendation for Hiring
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    onClick={() => handleUpdateStatus(selectedStep)}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                    </div> */}
      </section>
    </section>
  );
}
