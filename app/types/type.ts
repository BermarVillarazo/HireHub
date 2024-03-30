import { User } from "@/lib/schema";

export type Params = {
    params: {
        slug: string[];
    };
};

export type Props = {
    user: User;
};
