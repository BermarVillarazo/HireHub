export default function Applicants() {
    return (
        <section>
            <div className="bg-amber-500 w-[800px] mt-10 container px-6 m-auto rounded-lg">
                <div className="pt-8 pl-8 flex items-center">
                    <div className="bg-gray-300 h-32 w-32 rounded-full overflow-hidden mr-4 flex-shrink-0"></div>
                    <div className="container px-6 m-auto">
                        <p className="text-white text-2xl font-bold">Yankee Caburnay</p>
                        <p className="text-white">Faculty</p>
                        <p className="text-white">Applied x days ago</p>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="grid w-full max-w-xs items-center gap-1.5">
                        <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                        </label>
                        <input
                            placeholder="example@email.com"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="grid mt-4 w-full max-w-xs items-center gap-1.5">
                        <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Contact Number
                        </label>
                        <input
                            placeholder="+63"
                            type="phonenumber"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="grid mt-4 w-full max-w-xs items-center gap-1.5">
                        <p className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Preferred mode of communication
                        </p>
                        <p className="text-sm ml-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Phone Number
                        </p>
                    </div>

                    <div className="grid mt-4 w-full max-w-xs items-center gap-1.5">
                        <p className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Position applied
                        </p>
                        <p className="text-sm ml-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Teaching Staff
                        </p>
                    </div>

                    <div className="grid mt-4 w-full max-w-xs items-center gap-1.5">
                        <p className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Department
                        </p>
                        <p className="text-sm ml-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Department of Information Technology
                        </p>

                        <div className="flex mt-6 mb-8 justify-between">
                            <button className="bg-red-900 hover:bg-red-800 text-white font-semibold py-3 px-20 mr-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap">
                                UPDATE STATUS
                            </button>
                            <button className="bg-red-900 hover:bg-red-800 text-white font-semibold py-3 px-20 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap">
                                SEND EMAIL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
