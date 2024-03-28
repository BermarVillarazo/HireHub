import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

type Params = {
    params: {
        slug: string[];
    };
};

export default async function Page({ params }: Params) {
    const { user } = await validateRequest();

    if (!user) {
        return redirect("/login");
    }

    if (user) {
        console.log(user.email);
    }

    return (
        <div>
            <h1>This is the dynamic route</h1>
            <h1>{params.slug} POV</h1>
            <h1>Hi, {user.email}!</h1>
        </div>
    );
}
