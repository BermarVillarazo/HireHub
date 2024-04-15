import Font from "@/components/ui/Font";
import { MaroonBackGround } from "@/components/ui/MaroonBackground";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
	const { user } = await validateRequest();

	if (user) {
		return redirect("/dashboard/user");
	}

	// return (
	//     <MaroonBackGround backgroundColorMaroon={false}>
	//         <section className="bg-orange-300 w-1/2">
	//             <Font textColorWhite={true}>WORK AT CIT UNIVERSITY</Font>
	//             <p>
	//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore maiores
	//                 cupiditate magnam obcaecati laudantium, fugit quisquam molestiae exercitationem
	//                 asperiores aspernatur!
	//             </p>
	//         </section>
	//     </MaroonBackGround>
	// );

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-red-900">
			{/* navigation bar mockup */}
			<div className="h-20 w-full bg-red-900 text-white flex items-center fixed top-0 px-6">
				<p>Hirehub</p>
				<div className="flex-grow"></div>
				<p>Contact Us</p>
			</div>

			<form className="flex min-h-screen w-full flex-col items-center justify-center bg-white gap-y-8">
				<div className="h-96 w-1/2 flex items-center justify-center bg-amber-500 rounded-xl">
					<div className="h-full w-full flex flex-row gap-x-10 p-10 justify-center items-center">
						<div className="w-3/5 flex flex-col text-center gap-y-1.5">
							<div className="text-5xl font-bold">
								WORK AT CIT UNIVERSITY
							</div>
							<div className="font-semibold">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris
							</div>
						</div>
						<div className="bg-gray-600 w-2/5 h-full rounded-xl" />
					</div>
				</div>

				<button className="py-3 px-14 rounded-lg text-xl text-white bg-red-900 font-bold transform hover:scale-95 duration-200">
					APPLY NOW
				</button>
			</form>
		</div>
	);
}
