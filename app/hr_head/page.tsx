import Logout from "@/components/Logout";
import { getAllRecruiter } from "../lib/crud";

export default async function HRHeadPage() {
    const recuiter = await getAllRecruiter()
    // console.log(recuiter)
    return (
        <div>
            <p>HRHeadPage</p>
            <Logout />
        </div>
    );
}
