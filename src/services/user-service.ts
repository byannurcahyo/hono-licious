import {
    CreateRequest,
    UpdateRequest,
    Response,
    toUserResponse,
} from "../models/user-model.js";
import { UserValidation } from "../validations/user-validation.js";
import { HTTPException } from "hono/http-exception";
import prisma from "../../prisma/client/index.js";

export class UserService {
    static async register(request: CreateRequest): Promise<Response> {
        request = UserValidation.REGISTER.parse(request);

        if (!request.username || !request.password || !request.name) {
            throw new HTTPException(400, {
                message: "Missing fields",
            });
        }

        const checkUser = await prisma.user.findMany({
            where: { username: request.username },
        });
        if (checkUser.length != 0) {
            throw new HTTPException(400, {
                message: "Username already exists",
            });
        }

        request.password = await Bun.password.hash(request.password, {
            algorithm: "bcrypt",
            cost: 10,
        });

        const user = await prisma.user.create({
            data: request,
        });

        return toUserResponse(user);
    }

    static async getAll(): Promise<Response[]> {
        const users = await prisma.user.findMany();
        return users.map(toUserResponse);
    }

    static async get(id: number): Promise<Response> {
        const user = await prisma.user.findFirst({
            where: { id },
        });
        if (!user) {
            throw new HTTPException(404, {
                message: "User not found",
            });
        }

        return toUserResponse(user);
    }

    static async update(id: number, request: UpdateRequest): Promise<Response> {
        request = UserValidation.UPDATE.parse(request);

        const user = await prisma.user.findFirst({
            where: { id },
        });
        if (!user) {
            throw new HTTPException(404, {
                message: "User not found",
            });
        }

        if (request.password) {
            request.password = await Bun.password.hash(request.password, {
                algorithm: "bcrypt",
                cost: 10,
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: request,
        });

        return toUserResponse(updatedUser);
    }

    static async delete(id: number) {
        const user = await prisma.user.findFirst({
            where: { id },
        });
        if (!user) {
            throw new HTTPException(404, {
                message: "User not found",
            });
        }

        await prisma.user.delete({
            where: { id },
        });
    }
}
