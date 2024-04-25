import { Params } from "@/app/types/type";
import LandingPage from "@/components/dashboard/LandingPage";
import SuperAdmin from "@/components/dashboard/SuperAdmin";
import Logout from "@/components/Logout";
import { validateRequest } from "@/lib/auth";

export default async function Page({ params }: Params) {
    const { user } = await validateRequest();

    return (
        <>
            {params.slug[0] === "user" && (
                <>
                    <LandingPage />
                    <Logout />
                </>
            )}
            {params.slug[0] === "super_admin" && (
                <>
                    <SuperAdmin />
                    <Logout />
                </>
            )}
        </>
    );
}
