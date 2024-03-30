import LandingPage, { Container } from "@/components/dashboard/LandingPage";
import SSOButton from "@/components/ui/SSOButton";

export default async function Home() {
    return (
        <Container>
            <LandingPage />
            <SSOButton title="Go to Login page" loginAdmin="/login" loginSuperAdmin="" />
        </Container>
    );
}
