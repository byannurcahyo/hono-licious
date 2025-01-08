import { z, ZodType } from "zod";

export class AuthValidation {
    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
    });

    static readonly TOKEN: ZodType = z.object({
        accessToken: z.string().min(1).optional(),
        refreshToken: z.string().min(1).optional(),
    });

    static readonly LOGOUT: ZodType = z.object({
        refreshToken: z.string().min(1),
    });
}
