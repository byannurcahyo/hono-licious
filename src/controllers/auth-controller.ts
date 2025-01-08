import { Hono } from "hono";
import {
    LoginRequest,
    LogoutRequest,
    RefreshTokenRequest,
} from "../models/auth-model.js";
import { AuthService } from "../services/auth-service.js";

export const router = new Hono();

router.post("/login", async (c) => {
    const request: LoginRequest = await c.req.json();
    const response = await AuthService.login(request);
    return c.json(response);
});

router.post("/logout", async (c) => {
    const request: LogoutRequest = await c.req.json();
    await AuthService.logout(request);
    return c.status(204);
});

router.post("/refresh-token", async (c) => {
    const request: RefreshTokenRequest = await c.req.json();
    const response = await AuthService.refreshToken(request);
    return c.json(response);
});

export { router as authRouter };
