export type User = {
    id: number;
    role: string;
    name: string;
    nickname?: string | null;
    email?: string;
    avatar_url?: string | null;
};
