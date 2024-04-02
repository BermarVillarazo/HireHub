import { HandleUpdateUser } from "@/action/action";
import { ChildrenProps } from "@/app/types/type";
import { getUsers } from "@/lib/db";

export default async function SuperAdmin() {
    const getAllUsers = await getUsers();

    return (
        <form action={HandleUpdateUser} method="POST" className="w-full">
            <div className="w-full overflow-x-auto">
                {getAllUsers.map(({ id, name, firstName, lastName, email, role }) => (
                    <div key={id} className="flex gap-3 py-2">
                        <Div>
                            <Title>Name</Title>
                            <Description>{name}</Description>
                        </Div>
                        <Div>
                            <Title>First Name</Title>
                            <Description>{firstName}</Description>
                        </Div>
                        <Div>
                            <Title>Last Name</Title>
                            <Description>{lastName}</Description>
                        </Div>
                        <Div>
                            <Title>Email</Title>
                            <Description>{email}</Description>
                        </Div>
                        <Div>
                            <h1 className="bg-amber-500 text-xl font-bold p-1.5">Role</h1>
                            <select name="role" id="role" className="w-full bg-orange-300 p-1.5">
                                <option value="">{role}</option>
                                <option value="hr_head">hr_head</option>
                                <option value="vp_acad">vp_acad</option>
                                <option value="vp_admin">vp_admin</option>
                            </select>
                        </Div>
                        <Div>
                            <Title>Verify</Title>
                            <input type="checkbox" name="verify" defaultValue={`${name}`} />
                        </Div>
                        <Div>
                            <button type="submit">Submit</button>
                        </Div>
                    </div>
                ))}
            </div>
        </form>
    );
}

export function Div({ children }: ChildrenProps) {
    return <div className="text-md font-semibold bg-white w-full p-1.5">{children}</div>;
}

export function Title({ children }: ChildrenProps) {
    return <h1 className="bg-amber-500 text-xl font-bold p-1.5">{children}</h1>;
}

export function Description({ children }: ChildrenProps) {
    return <h1 className="bg-orange-300 p-1.5">{children}</h1>;
}
