import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await validateRequest();

    if (user) {
        return redirect("/dashboard/user");
    }

    return <section>GIEB MIER</section>;
}
