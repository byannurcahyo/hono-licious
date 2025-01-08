import { sign, verify } from "hono/jwt";
import { LoginRequest, Token } from "../models/auth-model";

export class JWTService {
    static async createToken(request: LoginRequest): Promise<Token> {
        const expiresIn = 60 * 60;
        const tokenPayload = {
            username: request.username,
            type: "access",
            exp: Math.floor(Date.now() / 1000) + expiresIn,
        };
        const secret = process.env.ACCESS_TOKEN_SECRET as string;
        const token = await sign(tokenPayload, secret);

        return { token, expiresIn };
    }

    static async createRefreshToken(request: LoginRequest): Promise<Token> {
        const expiresIn = 60 * 60 * 24 * 7;
        const refreshPayload = {
            username: request.username,
            type: "refresh",
            exp: Math.floor(Date.now() / 1000) + expiresIn,
        };
        const secret = process.env.REFRESH_TOKEN_SECRET as string;
        const token = await sign(refreshPayload, secret);

        return { token, expiresIn };
    }

    static async verifyToken(token: string): Promise<any> {
        const secret = process.env.ACCESS_TOKEN_SECRET as string;
        return verify(token, secret);
    }
}
