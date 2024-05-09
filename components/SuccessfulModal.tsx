"use client";

import { useRouter } from "next/navigation";

const SuccessfulModal = ({ setOpen }: { setOpen: any }) => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push("/");
    };

    return (
        <>
            <input type="checkbox" id="id_name" className="modal-toggle " checked={true} />
            <div className="modal w-full" role="dialog">
                <div
                    className="modal-box p-12 text-center text-black  bg-amber-500 shadow-3xl"
                    style={{ maxWidth: "50vw" }}
                >
                    <h3 className="text-4xl font-bold py-2.5">
                        Application Successfully Submitted!
                    </h3>
                    <p className="text-lg">
                        Please check your preferred mode of communication for updates regarding your
                        application. <br /> Laban, future Wildcat!
                    </p>
                    <Button onClick={handleButtonClick} />
                </div>
                <label className="modal-backdrop" htmlFor="id_name" onClick={() => setOpen(false)}>
                    Close
                </label>
            </div>
        </>
    );
};

export default SuccessfulModal;

function Button({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="group w-fit mx-auto relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-red-950 bg-gradient-to-tr from-red-900 to-red-800 px-10 py-2.5 text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-red-700 active:shadow-none mt-6"
            onClick={onClick}
        >
            <span className="absolute h-0 w-0 rounded-lg bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-full group-hover:w-full"></span>
            <span className="relative text-lg">Exit to Home</span>
        </button>
    );
}
