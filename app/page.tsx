import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface FeatureCardProps {
	iconSrc: string;
	altText: string;
	title: string;
	description: string;
}

interface ImageGridProps {
	images: string[];
}

export default async function Home() {
	const { user } = await validateRequest();

	if ((user && user?.role === "user") || user?.role === "recruitment_staff") {
		return redirect(`/${user?.role}`);
	} else if (user && !["user", "recruitment_staff"].includes(user?.role)) {
		return redirect(`/${user?.role}/requests`);
	} else if (user && user?.role === "user") {
		return redirect("/user");
	}
	// TODO: ADD DEPARTMENT/OFFICE REDIRECT
	// EXAMPLE: /${DEPARTMENT} || /${OFFICE}/REQUESTS

	return (
		<>
			{/* navigation placeholder */}
			<section className="bg-gray-200 w-full h-20"></section>
			<section
				className="xl:h-[80vh] lg:h-[65vh] md:h-[60vh] sm:h-[50vh] w-full 2xl:px-20 xl:px-18 lg:px-16 md:16 sm:px-10"
				style={{
					backgroundImage: `url(${"images/bgHeader.png"})`,
					backgroundSize: "cover",
					backgroundPosition: "left bottom",
					backgroundAttachment: "scroll",
					minHeight: "inherit",
				}}
			>
				<div className="h-full xl:w-10/12 lg:w-full flex flex-col justify-end xl:gap-y-4 lg:gap-y-2.5 md:gap-y-1.5 sm:gap-y-1 text-white 2xl:pb-20 xl:pb-12 lg:pb-8 md:pb-8 sm:pb-6">
					<h1 className="font-bold 2xl:text-8xl xl:text-7xl md:text-6xl sm:text-5xl">
						Elevate your Career <br /> with{" "}
						<span className="text-[#f8c400] font-black">CIT-U!</span>
					</h1>
					<div className="2xl:w-8/12 xl:w-10/12 lg:w-10/12 md:w-10/12 sm:w-9/12">
						<p className="2xl:text-xl xl:text-lg xl-font-medium lg:text-base sm:text-xs">
							Whether you're seeking a role in faculty, office administration, or
							departmental services, we invite dedicated individuals to join us in our
							mission of providing quality education.
						</p>
					</div>
					<div className="xl:w-1/4 md:w-1/5 sm:w-1/5">
						<Link href="/apply-now">
							<div className="bg-[#f8c400] text-center md:font-bold text-white w-full xl:p-3 xl:text-xl lg:rounded-xl lg:text-base lg:p-2 lg:px-10 md:p-1.5 md:text-sm md:px-5 md:rounded-lg sm:p-1 sm:text-xs sm:px-5 sm:font-semibold sm:rounded-lg hover:scale-95">
								Apply Now
							</div>
						</Link>
					</div>
				</div>
			</section>

			<section className="w-full 2xl:h-[340px] xl:h-72 lg:h-[310px] md:h-[280px] sm:h-fit flex md:flex-row lg:gap-x-10 md:gap-x-8 justify-center sm:p-10 sm:flex-col sm:gap-y-8 2xl:px-32 xl:px-28 lg:px-20 md:px-14">
				<FeatureCard
					iconSrc="/images/icons/career.png"
					altText="career"
					title="Growth Opportunities"
					description="CIT fosters professional development and advancement opportunities for its employees."
				/>
				<FeatureCard
					iconSrc="/images/icons/inclusive.png"
					altText="inclusive"
					title="Inclusive Workplace"
					description="CIT prioritizes diversity and teamwork, fostering a supportive environment for all employees."
				/>
				<FeatureCard
					iconSrc="/images/icons/benefits.png"
					altText="benefits"
					title="Comprehensive Benefits"
					description="CIT offers company insurance and others, ensuring employee satisfaction and well-being."
				/>
			</section>

			<section className="w-full text-center  text-black justify-center items-center flex flex-col 2xl:gap-y-3 xl:h-[550px] xl:gap-y-2.5 md:gap-y-2 xl:mb-12 lg:h-[500px] lg:mb-14 md:h-[400px] md:mb-12 sm:h-[350px] sm:gap-y-1.5 sm:mb-10">
				<div className="flex flex-col gap-y-1">
					<h1 className="font-bold 2xl:text-4xl xl:text-3xl md:text-4xl sm:text-2xl">
						Have a question?
					</h1>
					<span className="font-extrabold 2xl:text-8xl xl:text-7xl md:text-6xl sm:text-5xl">
						Connect with CIT-U!
					</span>
				</div>
				<p className="md:w-8/12  2xl:text-xl xl:text-base md:text-sm sm:text-sm sm:w-full sm:px-14">
					Should you have any questions or need assistance, please don't hesitate to
					contact us. We're available to provide the support you require. Your inquiries
					are valuable to us, and we aim to address them promptly and effectively. We look
					forward to hearing from you!
				</p>
				<div className="flex flex-row items-center 2xl:gap-x-4 xl:gap-x-3 md:gap-x-1.5 sm:gap-x-1.5 sm:py-1">
					<a href="mailto:francegieb.mier@cit.edu">
						<img
							src="/images/icons/email.png"
							alt="Email us"
							className="2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 md:h-8 md:w-8 sm:h-8 sm:w-8 hover:scale-95"
						/>
					</a>

					<a href="tel:(032)4112000">
						<img
							src="/images/icons/tel.png"
							alt="Call us"
							className="2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 md:h-8 md:w-8 sm:h-8 sm:w-8 hover:scale-95"
						/>
					</a>
					<a href="https://www.facebook.com/CITUniversity">
						<img
							src="/images/icons/facebook.png"
							alt="Message us"
							className="2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 md:h-8 md:w-8 sm:h-8 sm:w-8 hover:scale-95"
						/>
					</a>
				</div>
			</section>

			<section className="w-full h-fit bg-slate-300 flex flex-row">
				<ImageGrid images={["1", "8", "7", "2"]} />
				<ImageGrid images={["3", "9", "11", "10"]} />
				<ImageGrid images={["5", "14", "12", "6"]} />
			</section>
		</>
	);
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconSrc, altText, title, description }) => {
	return (
		<div className="h-full lg:w-1/3 md:w-1/3 sm:w-full flex justify-center items-center">
			<div className="text-black border border-gray-300 rounded-3xl shadow-lg drop-shadow-lg flex flex-col justify-center 2xl:h-56 xl:h-52 lg:h-56 2xl:gap-y-2.5 xl:gap-y-2 lg:gap-y-2 2xl:p-8 xl:p-6 lg:p-6 md:h-48 md:py-3 md:gap-y-2 md:p-4 sm:h-56 sm:gap-y-2 sm:p-6">
				<img
					src={iconSrc}
					alt={altText}
					className="2xl:h-14 2xl:w-14 xl:h-12 xl:w-12 lg:h-12 lg:w-12 md:h-10 md:w-10 sm:h-16 sm:w-16"
				/>
				<div className="flex flex-col gap-y-1">
					<h1 className="2xl:text-xl lg:text-lg md:text-base sm:text-2xl font-bold">
						{title}
					</h1>
					<p className="2xl:text-sm lg:text-sm md:text-xs sm:text-lg">{description}</p>
				</div>
			</div>
		</div>
	);
};

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
	return (
		<div className="h-full w-1/3 flex flex-row">
			<div className="h-full w-1/2 flex flex-col">
				<div className="h-1/2 w-full">
					<img
						src={`/images/randomphotos/${images[0]}.jpg`}
						alt=""
						className="w-full h-full"
					/>
				</div>
				<div className="h-1/2 w-full">
					<img
						src={`/images/randomphotos/${images[1]}.jpg`}
						alt=""
						className="w-full h-full"
					/>
				</div>
			</div>
			<div className="h-full w-1/2 flex flex-col">
				<div className="h-1/2 w-full">
					<img
						src={`/images/randomphotos/${images[2]}.jpg`}
						alt=""
						className="w-full h-full"
					/>
				</div>
				<div className="h-1/2 w-full">
					<img
						src={`/images/randomphotos/${images[3]}.jpg`}
						alt=""
						className="w-full h-full"
					/>
				</div>
			</div>
		</div>
	);
};
