import React from 'react'

type LabelInputProps = {
    label: string;
    value: string;
};

export default function LabelInput({ label, value }: LabelInputProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-md text-white font-medium">{label}</label>
            <input
                type="text"
                value={value}
                className="input input-bordered w-full input-md"
                disabled
            />
        </div>
    );
}
