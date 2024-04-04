import Container from "@/components/dashboard/LandingPage";
import { MaroonBackGround } from "@/components/ui/MaroonBackground";
import SSOButton from "@/components/ui/SSOButton";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
    const { user } = await validateRequest();

    if (user) {
        return redirect("/dashboard/user");
    }

    return (
        <MaroonBackGround IsMaroon={true}>
            <Container />
            <SSOButton title="Go to Login page" loginAdmin="/login" loginSuperAdmin="" />
        </MaroonBackGround>
    );
}
