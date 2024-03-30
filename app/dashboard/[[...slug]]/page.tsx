import { Params } from "@/app/types/type";
import HrHead from "@/components/dashboard/HrHead";
import LandingPage, { Container } from "@/components/dashboard/LandingPage";
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
                    <Container>
                        <LandingPage />
                        <Logout />
                    </Container>
                </>
            )}
            {params.slug[0] === "hr_head" && user && (
                <>
                    <Container>
                        <HrHead user={user} />
                        <Logout />
                    </Container>
                </>
            )}
            {params.slug[0] === "vp_acad" && user && (
                <>
                    <Container>
                        <VpAcad user={user} />
                        <Logout />
                    </Container>
                </>
            )}
            {params.slug[0] === "vp_admin" && user && (
                <>
                    <Container>
                        <VpAdmin user={user} />
                        <Logout />
                    </Container>
                </>
            )}
        </>
    );
}
