import { Params } from "@/app/types/type";
import HrHead from "@/components/dashboard/HrHead";
import LandingPage from "@/components/dashboard/LandingPage";
import SuperAdmin from "@/components/dashboard/SuperAdmin";
import VpAcad from "@/components/dashboard/VpAcad";
import VpAdmin from "@/components/dashboard/VpAdmin";
import Logout from "@/components/ui/Logout";
import { validateRequest } from "@/lib/auth";

export default async function Page({ params }: Params) {
    const { user } = await validateRequest();

    return (
        <>
            {params.slug[0] === "user" && (
                <>
                    <>
                        <LandingPage />
                        <Logout />
                    </>
                </>
            )}
            {params.slug[0] === "super_admin" && user && (
                <>
                    <>
                        <SuperAdmin user={user} />
                        <Logout />
                    </>
                </>
            )}
            {params.slug[0] === "hr_head" && user && (
                <>
                    <>
                        <HrHead user={user} />
                        <Logout />
                    </>
                </>
            )}
            {params.slug[0] === "vp_acad" && user && (
                <>
                    <>
                        <VpAcad user={user} />
                        <Logout />
                    </>
                </>
            )}
            {params.slug[0] === "vp_admin" && user && (
                <>
                    <>
                        <VpAdmin user={user} />
                        <Logout />
                    </>
                </>
            )}
        </>
    );
}
