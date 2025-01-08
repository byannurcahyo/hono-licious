import {
    LoginRequest,
    LogoutRequest,
    RefreshTokenRequest,
    TokenResponse,
    toAuthResponse,
} from "../models/auth-model.js";
import { AuthValidation } from "../validations/auth-validation.js";
import { HTTPException } from "hono/http-exception";
import prisma from "../../prisma/client/index.js";
import { JWTService } from "./jwt-service.js";

export class AuthService {
    static async login(request: LoginRequest): Promise<TokenResponse> {
        request = AuthValidation.LOGIN.parse(request);

        if (!request.username || !request.password) {
            throw new HTTPException(400, {
                message: "Missing fields",
            });
        }

        const checkUser = await prisma.user.findFirst({
            where: { username: request.username },
        });
        if (!checkUser) {
            throw new HTTPException(404, {
                message: "User not found",
            });
        }

        const checkPass = await Bun.password.verify(
            request.password,
            checkUser.password
        );
        if (!checkPass) {
            throw new HTTPException(400, {
                message: "Invalid password",
            });
        }

        await prisma.token.deleteMany({
            where: { userId: checkUser.id },
        });

        const accessToken = await JWTService.createToken(checkUser);
        const refreshToken = await JWTService.createRefreshToken(checkUser);

        await prisma.token.createMany({
            data: [
                {
                    token: accessToken.token,
                    userId: checkUser.id,
                    type: "ACCESS",
                },
                {
                    token: refreshToken.token,
                    userId: checkUser.id,
                    type: "REFRESH",
                },
            ],
        });
        return toAuthResponse(accessToken, refreshToken);
    }

    static async logout(request: LogoutRequest) {
        request = AuthValidation.LOGOUT.parse(request);

        const findUser = await prisma.token.findMany({
            where: { token: request.refreshToken },
            select: { userId: true },
        });
        if (!findUser.length) {
            throw new HTTPException(404, {
                message: "Token not found",
            });
        }

        await prisma.token.deleteMany({
            where: { userId: findUser[0].userId },
        });
    }

    static async refreshToken(
        request: RefreshTokenRequest
    ): Promise<TokenResponse> {
        request = AuthValidation.TOKEN.parse(request);

        await prisma.token.findFirst({
            where: { token: request.refreshToken, type: "REFRESH" },
            include: { user: true },
        });
        const token = await JWTService.verifyToken(request.refreshToken);
        if (!token) {
            throw new HTTPException(404, {
                message: "Token not valid",
            });
        }
        await prisma.token.deleteMany({
            where: { userId: token.userId },
        });

        const accessToken = await JWTService.createToken(token.user);
        const refreshToken = await JWTService.createRefreshToken(token.user);

        await prisma.token.createMany({
            data: [
                {
                    token: accessToken.token,
                    userId: token.userId,
                    type: "ACCESS",
                },
                {
                    token: refreshToken.token,
                    userId: token.userId,
                    type: "REFRESH",
                },
            ],
        });

        return toAuthResponse(accessToken, refreshToken);
    }
}
