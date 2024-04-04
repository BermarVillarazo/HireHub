import Font from "@/components/ui/Font";
import { MaroonBackGround } from "@/components/ui/MaroonBackground";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await validateRequest();

    if (user) {
        return redirect("/dashboard/user");
    }

    return (
        <MaroonBackGround textColorMaroon={false}>
            <section className="bg-orange-300 w-1/2">
                <Font textColorWhite={true}>WORK AT CIT UNIVERSITY</Font>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore maiores
                    cupiditate magnam obcaecati laudantium, fugit quisquam molestiae exercitationem
                    asperiores aspernatur!
                </p>
            </section>
        </MaroonBackGround>
    );
}
