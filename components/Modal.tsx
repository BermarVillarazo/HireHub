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
