import { DepartmentProps } from "@/app/types/type";
import Logout from "@/components/Logout";
import SuperAdmin from "@/components/dashboard/SuperAdmin";
import CCS from "@/components/department/CCS";
import CE from "@/components/department/CE";
import SHS from "@/components/department/SHS";

export default async function Page({ params }: DepartmentProps) {
    return (
        <>
            {params.department === "super_admin" && (
                <>
                    <SuperAdmin />
                </>
            )}
            {params.department === "css" && (
                <>
                    <CCS />
                </>
            )}
            {params.department === "ce" && (
                <>
                    <CE />
                </>
            )}
            {params.department === "shs" && (
                <>
                    <SHS />
                </>
            )}
            <Logout />
        </>
    );
}
