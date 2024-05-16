// export type ConfirmationPopupProps = {
//     message: string;
//     onCancel: () => void;
//     onConfirm: () => void;
// };

// export default function ConfirmationPopup({
//     message,
//     onCancel,
//     onConfirm,
// }: ConfirmationPopupProps) {
//     return (
//         <div className="fixed inset-0 overflow-y-auto flex items-center justify-center w-full z-50">
//             <div className="flex items-center justify-center w-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                 <div
//                     className="fixed inset-0 "
//                     aria-hidden="true"
//                 >
//                     <div className="absolute inset-0 bg-gray-500/20 opacity-70"></div>
//                 </div>

//                 <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-xl w-3/12">
//                     <div className="bg-white p-8  w-full max-w-3xl">
//                         <div className="sm:flex sm:justify-center items-center">
//                             <div className="mt-4 mx-auto text-center sm:mt-0 sm:text-left w-10/12">
//                                 <h3 className="text-3xl leading-6 font-bold text-gray-900 mb-8 text-center">
//                                     Confirm Action
//                                 </h3>
//                                 <div className="mt-2 text-center">
//                                     <p>{message}</p>

//                                     {/* Yes and No buttons */}
//                                     <div className="flex justify-center mt-8">
//                                         <button
//                                             type="button"
//                                             onClick={onCancel}
//                                             className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
//                                         >
//                                             No
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={onConfirm}
//                                             className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-800 hover:bg-red-900"
//                                         >
//                                             Yes
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


export type ConfirmationPopupProps = {
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmationPopup({
    message,
    onCancel,
    onConfirm,
}: ConfirmationPopupProps) {
    return (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center w-full z-50">
            <div className="flex items-center justify-center w-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500/20 opacity-70"></div>
                </div>

                <div className="card mx-auto w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Confirm Action</h2>
                        <p>{message}</p>
                        <div className="card-actions justify-end">
                            <button onClick={onCancel} className="btn btn-ghost hover:btn-outline">
                                Deny
                            </button>
                            <button
                                onClick={onConfirm}
                                className="btn hover:btn-error btn-outline btn-error"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
