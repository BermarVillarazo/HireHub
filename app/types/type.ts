import { User } from "@/lib/schema";
import { ReactNode } from "react";

export type Params = {
    params: {
        slug: string[];
    };
};

export type Props = {
    user: User;
};

export type GetAllUsers = {
    getAllUsers: User;
};

export type UsersProps = {
    id?: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
};

export type ChildrenProps = {
    children: ReactNode;
};