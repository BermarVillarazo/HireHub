"use client";

import { DepartmentListsProps, OfficeListsProps } from "@/app/types/type";
import { User } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";

export default function RecruitmentStaffDashboard({
  users,
  departments,
  offices,
}: {
  users: User;
  departments: DepartmentListsProps;
  offices: OfficeListsProps;
}) {
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [formData, setFormData] = useState<{
    departmentName: string;
    officeName: string;
  }>();
  const [selectedRepresentativeId, setSelectedRepresentativeId] = useState<
    number | null
  >(null);
  const [selectedRepresentative, setSelectedRepresentative] = useState<
    "department_representative" | "office_representative"
  >();
  const router = useRouter();

  function handleSelectUserRole(id: number) {
    setSelectedRepresentativeId(id);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const representativeFormData = {
      departmentName: formData.get(
        "select_department_representative"
      ) as string,
      officeName: formData.get("select_office_representative") as string,
    };
    setFormData(representativeFormData);
    setShowConfirmationMessage(true);
  }

  async function handleConfirmUpdateUserRole() {
    try {
      if (selectedRepresentative === "department_representative") {
        await fetch(
          `api/recruitment_staff/staff/department/${selectedRepresentativeId}`,
          {
            method: "PUT",
            body: JSON.stringify(formData),
          }
        );
      } else if (selectedRepresentative === "office_representative") {
        await fetch(
          `api/recruitment_staff/staff/office/${selectedRepresentativeId}`,
          {
            method: "PUT",
            body: JSON.stringify(formData),
          }
        );
      }

      router.refresh();
      setShowConfirmationMessage(false);

      return toast.success("User has updated the role successfully!");
    } catch (error: unknown) {
      return toast.error("Something went wrong!" + (error as Error).message);
    }
  }

  const labelStyle: string = "flex items-center justify-center";

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto py-10">
        <div className="grid grid-cols-8 text-center border p-2">
          <div>Name</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Select Representative</div>
          <div>Department / Office</div>
        </div>
        {Array.isArray(users) &&
          users.map(({ id, name, firstName, lastName, email, role }) => (
            <form
              key={id}
              onSubmit={handleFormSubmit}
              //   className="flex justify-around gap-3 items-center"
              className="grid grid-cols-8 justify-center items-centers text-center p-4 gap-2"
            >
              <label className={labelStyle}>{name}</label>
              <label className={labelStyle}>{firstName}</label>
              <label className={labelStyle}>{lastName}</label>
              <label className={labelStyle}>{email}</label>
              <label className={labelStyle}>{role}</label>
              {/* <DIV
               title="Name" name={name} fixWidth="" />
              <DIV title="First Name" name={firstName} />
              <DIV title="Last Name" name={lastName} />
              <DIV title="Email" name={email} /> */}
              <div className="flex items-center gap-10">
                <div className="flex flex-col flex-1 bg-white rounded-lg shadow-xl">
                  <div className="flex justify-around items-center p-2">
                    <FieldSet
                      value="department_representative"
                      name="Department"
                      setSelectedRepresentative={(value: string) =>
                        setSelectedRepresentative(
                          value as
                            | "department_representative"
                            | "office_representative"
                        )
                      }
                    />
                    <FieldSet
                      value="office_representative"
                      name="Office"
                      setSelectedRepresentative={(value: string) =>
                        setSelectedRepresentative(
                          value as
                            | "department_representative"
                            | "office_representative"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              {selectedRepresentative === "department_representative" ? (
                <div className="flex flex-col flex-1 bg-white rounded-lg p-2 shadow-xl">
                  <select
                    name="select_department_representative"
                    className="w-full h-full"
                  >
                    {Array.isArray(departments) &&
                      departments.map(({ department_id, department_name }) => (
                        <option key={department_id} value={department_name}>
                          {department_name}
                        </option>
                      ))}
                  </select>
                </div>
              ) : (
                selectedRepresentative === "office_representative" && (
                  <div className="flex flex-col bg-white rounded-lg p-1 shadow-xl">
                    <select
                      name="select_office_representative"
                      className="w-full h-full"
                    >
                      {Array.isArray(offices) &&
                        offices.map(({ office_id, office_name }) => (
                          <option key={office_id} value={office_name}>
                            {office_name}
                          </option>
                        ))}
                    </select>
                  </div>
                )
              )}
              <button
                onClick={() => handleSelectUserRole(id)}
                className="group w-32 relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-red-900 bg-gradient-to-tr from-red-700 to-red-800 p-3 font-bold text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-95 active:shadow-none"
              >
                Update Role
              </button>
              {showConfirmationMessage && (
                <ConfirmationPopup
                  message="Are you sure you want to update the role of user"
                  onCancel={() => setShowConfirmationMessage(false)}
                  onConfirm={handleConfirmUpdateUserRole}
                />
              )}
            </form>
          ))}
      </div>
    </div>
  );
}

function DIV({
  title,
  name,
  fixWidth,
}: {
  title: string;
  name: string;
  fixWidth: string;
}) {
  return (
    <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-xl">
      <div className="flex flex-col">
        {/* <Label title={title} /> */}
        <span className="mx-auto">{name}</span>
      </div>
    </div>
  );
}

function Label({ title }: { title: string }) {
  return <label className="font-bold">{title}</label>;
}

type FieldSetProps = {
  value: string;
  name: string;
  setSelectedRepresentative: (value: string) => void;
};

function FieldSet({ value, name, setSelectedRepresentative }: FieldSetProps) {
  return (
    <fieldset className="flex px-2">
      <input
        type="radio"
        value={value}
        name="representative_option"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSelectedRepresentative(e.target.value)
        }
      />
      <label>{name}</label>
    </fieldset>
  );
}
