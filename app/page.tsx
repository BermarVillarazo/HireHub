import LandingPage, { Container } from "@/components/dashboard/LandingPage";
import SSOButton from "@/components/ui/SSOButton";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await validateRequest();

    if (user) {
        return redirect("/dashboard/user");
    }

    return (
        <Container>
            <LandingPage />
            <SSOButton title="Go to Login page" loginAdmin="/login" loginSuperAdmin="" />
        </Container>
    );
}
