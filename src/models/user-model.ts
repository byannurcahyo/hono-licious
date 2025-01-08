import { Role, User } from "@prisma/client";

export type CreateRequest = {
    username: string;
    password: string;
    name: string;
    role?: Role;
};

export type UpdateRequest = {
    username?: string;
    password?: string;
    name?: string;
    role?: Role;
};

export type Response = {
    id: number;
    username: string;
    password?: string;
    name: string;
    role?: Role;
    createdAt: Date;
    updatedAt: Date;
};

export function toUserResponse(user: User): Response {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
